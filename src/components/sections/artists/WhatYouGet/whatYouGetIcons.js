import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Gift,
  Globe2,
  Headphones,
  PlaySquare,
  ShieldCheck,
  Star,
} from 'lucide-react';

const iconMap = {
  gift: Gift,
  globe: Globe2,
  shieldCheck: ShieldCheck,
  video: PlaySquare,
  chart: ChartNoAxesCombined,
  headphones: Headphones,
  check: Check,
  star: Star,
  arrowRight: ArrowRight,
};

/**
 * Resolve serializable icon keys from JSON to Lucide components.
 */
export function getWhatYouGetIcon(name) {
  return iconMap[name] ?? Gift;
}
