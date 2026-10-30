import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import {
  getUniqueHeroSlides,
  getAvailableHeroSlides,
  getReadyHeroSlides,
  getNextReadyHeroSlide,
} from '../src/components/sections/home/HomeHero/heroCarouselImages.js';

test('slide count matches only configured unique images; no defaults are inserted', () => {
  const five = Array.from({ length: 5 }, (_, index) => ({
    id: `artist-${index}`,
    src: `/Hero_artist/${index}.webp`,
  }));

  assert.equal(getUniqueHeroSlides(five).length, 5);
  assert.equal(getUniqueHeroSlides([]).length, 0);
  assert.equal(getUniqueHeroSlides(undefined).length, 0);
  assert.equal(getUniqueHeroSlides([...five, five[0], { id: 'bad', src: '' }]).length, 5);
});

test('every configured homepage hero image exists as a real public asset', () => {
  const data = JSON.parse(
    readFileSync(fileURLToPath(new URL('../src/data/homeHero.json', import.meta.url)), 'utf8')
  );
  const slides = getUniqueHeroSlides(data.artistSlides);
  assert.equal(slides.length, data.artistSlides.length, 'duplicate or empty image sources in configuration');

  const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
  for (const slide of slides) {
    assert.match(slide.src, /^\/Hero_artist\/[^/]+\.webp$/);
    assert.ok(
      existsSync(resolve(publicDir, slide.src.slice(1))),
      `Missing hero asset: ${slide.src}`
    );
  }
});

test('failed images are removed from both rotation and indicator inventory', () => {
  const slides = getUniqueHeroSlides([
    { src: '/a.webp' }, { src: '/b.webp' }, { src: '/c.webp' },
  ]);
  const statuses = { '/a.webp': 'ready', '/b.webp': 'failed', '/c.webp': 'loading' };
  const available = getAvailableHeroSlides(slides, statuses);
  const ready = getReadyHeroSlides(available, statuses);

  assert.deepEqual(available.map((item) => item.src), ['/a.webp', '/c.webp']);
  assert.deepEqual(ready.map((item) => item.src), ['/a.webp']);
  assert.equal(getNextReadyHeroSlide(ready, '/a.webp')?.src, '/a.webp');
});

test('rotation wraps through ready photos without inventing extra images', () => {
  const slides = getUniqueHeroSlides([
    { src: '/a.webp' }, { src: '/b.webp' }, { src: '/c.webp' },
  ]);
  const statuses = { '/a.webp': 'ready', '/b.webp': 'loading', '/c.webp': 'ready' };
  const ready = getReadyHeroSlides(getAvailableHeroSlides(slides, statuses), statuses);

  assert.equal(getNextReadyHeroSlide(ready, '/a.webp')?.src, '/c.webp');
  assert.equal(getNextReadyHeroSlide(ready, '/c.webp')?.src, '/a.webp');
  assert.equal(getNextReadyHeroSlide(ready, null)?.src, '/a.webp');
  assert.equal(getNextReadyHeroSlide([], '/a.webp'), null);
});
