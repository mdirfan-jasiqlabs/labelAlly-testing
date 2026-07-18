import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

/**
 * TestimonialsSection — Renders customer testimonials if they exist.
 * Otherwise, renders a safe, professional placeholder invite block.
 */
function TestimonialsSection() {
  const { testimonials } = homeData;

  if (!testimonials) return null;

  const hasTestimonials = testimonials.items && testimonials.items.length > 0;

  return (
    <section
      aria-labelledby="testimonials-section-heading"
      className="py-20 md:py-28 lg:py-36 bg-neutral-50/60 border-t border-neutral-100"
    >
      <Container>
        {/* Section Header */}
        <SectionHeading
          titleAs="h2"
          badge={testimonials.badge}
          title={testimonials.heading}
          description={testimonials.description}
          align="center"
          className="mb-14"
        />

        {hasTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.items.map((item, index) => (
              <Card
                key={index}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col justify-between bg-white/30"
              >
                <blockquote className="text-neutral-600 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={`${item.name}`}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                    />
                  )}
                  <div>
                    <cite className="not-italic block text-sm font-semibold text-neutral-900">
                      {item.name}
                    </cite>
                    <span className="text-xs text-neutral-9000">
                      {item.role} {item.company ? `at ${item.company}` : ''}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Safe Fallback Block when no testimonials exist yet */
          <div className="max-w-2xl mx-auto text-center">
            <Card
              padding="lg"
              radius="2xl"
              bordered
              hover={false}
              glow
              glowColor="primary"
              className="flex flex-col items-center gap-6 bg-white border border-neutral-200/80"
            >
              <div aria-hidden="true" className="w-12 h-12 rounded-full bg-primary-50/80 border border-primary-100/50 flex items-center justify-center text-primary-600">
                <MessageSquare size={22} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold font-heading text-neutral-900">
                  Build Your Success Story With Us
                </h3>
                <p className="text-sm text-neutral-9000 leading-relaxed max-w-md mx-auto">
                  We work closely with independent labels, artists, and brands to maximize catalog value. Get in touch to discuss how we can grow together.
                </p>
              </div>
              <Button
                as={Link}
                to="/contact"
                aria-label="Contact us to get started with LabelAlly Entertainment"
                variant="outline"
                size="md"
                rightIcon={<ArrowRight size={16} aria-hidden="true" />}
              >
                Let's Talk
              </Button>
            </Card>
          </div>
        )}
      </Container>
    </section>
  );
}

export default TestimonialsSection;
