import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import contactData from '../../../data/contact.json';
import { contact } from '../../../config/site';

/**
 * ContactMethods — Renders direct contact methods (email, phone, etc.)
 */
function ContactMethods() {
  const { methods } = contactData;

  if (!methods) return null;

  // Compile active methods based on what's configured in site.js
  const items = [
    {
      id: 'email',
      title: methods.labels.email,
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : null,
      icon: Mail,
    },
    {
      id: 'phone',
      title: methods.labels.phone,
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone}` : null,
      icon: Phone,
    },
    {
      id: 'address',
      title: methods.labels.address,
      value: contact.address,
      href: null,
      icon: MapPin,
    },
    {
      id: 'hours',
      title: methods.labels.hours,
      value: contact.businessHours,
      href: null,
      icon: Clock,
    },
  ].filter((item) => item.value); // Only show if configured

  return (
    <section
      aria-labelledby="methods-heading"
      className="py-16 md:py-24 bg-white border-t border-neutral-100"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={methods.heading}
          description={methods.description}
          align="center"
          className="mb-14"
        />

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const Icon = item.icon;
              const isLink = !!item.href;

              return (
                <Card
                  key={item.id}
                  padding="lg"
                  radius="xl"
                  bordered
                  hover={isLink}
                  className="flex flex-col gap-4 bg-neutral-50/60 text-center items-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold font-heading text-neutral-600">
                    {item.title}
                  </h3>
                  {isLink ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-neutral-900 hover:text-accent-600 transition-colors duration-250 break-all focus-ring rounded px-1 py-0.5"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-neutral-900 break-words max-w-xs">
                      {item.value}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <Card padding="md" radius="lg" bordered hover={false}>
              <p className="text-sm text-neutral-900 italic">
                Direct contact methods will be available soon. Please use the messaging form below.
              </p>
            </Card>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ContactMethods;
