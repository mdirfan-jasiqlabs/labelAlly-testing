import footerData from '../../../data/footer.json';

/**
 * Shared primary contact channels from footer.json.
 * Used by the info panel and bottom contact strip — no duplicated business data.
 */
export function getPrimaryContactChannels({ whatsappLabel } = {}) {
  const contact = footerData?.contact ?? {};
  const channels = [];

  if (contact.address?.enabled !== false && contact.address?.value) {
    channels.push({
      id: 'address',
      type: 'address',
      label: contact.address.heading || 'Address',
      value: contact.address.value,
      href: null,
      accent: 'rose',
      icon: 'map-pin',
      showInStrip: true,
    });
  }

  if (contact.phone?.enabled !== false && contact.phone?.value) {
    channels.push({
      id: 'phone',
      type: 'phone',
      label: contact.phone.heading || 'Phone',
      value: contact.phone.value,
      href: contact.phone.href || null,
      accent: 'emerald',
      icon: 'phone',
      showInStrip: true,
    });
  }

  if (contact.email?.enabled !== false && contact.email?.value) {
    channels.push({
      id: 'email',
      type: 'email',
      label: contact.email.heading || 'Email',
      value: contact.email.value,
      href: contact.email.href || null,
      accent: 'blue',
      icon: 'mail',
      showInStrip: true,
    });
  }

  if (contact.whatsapp?.enabled !== false && contact.whatsapp?.href) {
    channels.push({
      id: 'whatsapp',
      type: 'whatsapp',
      label: contact.whatsapp.heading || 'WhatsApp',
      value: whatsappLabel || 'Chat with us on WhatsApp',
      href: contact.whatsapp.href,
      accent: 'whatsapp',
      icon: 'whatsapp',
      showInStrip: false,
      external: true,
    });
  }

  return channels;
}

export function getStripChannels(channels) {
  return (channels ?? []).filter((channel) => channel.showInStrip);
}
