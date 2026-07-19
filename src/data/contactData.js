import footerData from './footer.json';

/**
 * Resolve verified contact values from footer.json (single source of truth).
 * UI metadata lives here; address/phone/email/WhatsApp values are never duplicated.
 */
function resolveContactMethods(methodDefs, footerContact = {}) {
  return methodDefs.map((def) => {
    const source = footerContact[def.sourceKey];

    if (!source || source.enabled === false) {
      return {
        ...def,
        enabled: false,
        value: '',
        href: null,
      };
    }

    if (def.type === 'address') {
      return {
        ...def,
        value: source.value || '',
        href: null,
        external: false,
      };
    }

    if (def.type === 'whatsapp') {
      return {
        ...def,
        // Display copy stays in section data; URL comes from footer
        value: def.displayValue || 'Chat with our team',
        href: source.href || null,
        external: true,
      };
    }

    return {
      ...def,
      value: source.value || '',
      href: source.href || null,
      external: false,
    };
  });
}

const contactMethodDefs = [
  {
    id: 'address',
    type: 'address',
    sourceKey: 'address',
    label: 'Address',
    icon: 'map-pin',
    accent: 'rose',
    showInPanel: true,
    showInStrip: true,
    enabled: true,
  },
  {
    id: 'phone',
    type: 'phone',
    sourceKey: 'phone',
    label: 'Phone',
    icon: 'phone',
    accent: 'emerald',
    showInPanel: true,
    showInStrip: true,
    enabled: true,
  },
  {
    id: 'email',
    type: 'email',
    sourceKey: 'email',
    label: 'Email',
    icon: 'mail',
    accent: 'blue',
    showInPanel: true,
    showInStrip: true,
    enabled: true,
  },
  {
    id: 'whatsapp',
    type: 'whatsapp',
    sourceKey: 'whatsapp',
    label: 'WhatsApp',
    displayValue: 'Chat with our team',
    icon: 'message-circle',
    accent: 'whatsapp',
    showInPanel: true,
    showInStrip: false,
    enabled: true,
  },
];

/**
 * Contact form section data — LabelAlly Entertainment.
 * Verified contact channels resolve from footer.json at module load.
 */
export const contactFormSectionData = {
  enabled: true,

  heading: {
    badge: 'Get In Touch',
    title: "Let's Start a Conversation",
    description:
      'Have a catalog, release, or partnership in mind? Reach out and our team will help you take the next step.',
    enabled: true,
  },

  infoPanel: {
    title: "We're Here to Help",
    description: 'Reach out to us using any of the channels below.',
    icon: 'headphones',
    responseNote: {
      text: '',
      enabled: false,
    },
    enabled: true,
  },

  contactMethods: resolveContactMethods(
    contactMethodDefs,
    footerData?.contact ?? {}
  ),

  form: {
    title: 'Send Us a Message',
    description:
      'Complete the form below and our team will get back to you as soon as possible.',

    fields: {
      name: {
        label: 'Name',
        placeholder: 'Enter your name',
        icon: 'user',
        required: true,
        enabled: true,
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
        icon: 'mail',
        required: true,
        enabled: true,
      },
      phone: {
        label: 'Phone',
        placeholder: 'Enter your phone number',
        icon: 'phone',
        required: true,
        enabled: true,
      },
      // Not supported in schema / API / email template — keep disabled
      subject: {
        label: 'Subject',
        placeholder: 'Select or enter a subject',
        icon: 'tag',
        required: false,
        enabled: false,
      },
      // Existing optional field (maps to API `company`)
      company: {
        label: 'Company / Label (Optional)',
        placeholder: 'Your label or brand name',
        icon: 'building',
        required: false,
        enabled: true,
      },
      // Required by existing Zod schema + serverless payload
      service: {
        label: 'Service Interest',
        placeholder: 'Select a service...',
        icon: 'list-filter',
        required: true,
        enabled: true,
      },
      message: {
        label: 'Message',
        placeholder: 'Tell us how we can help',
        icon: 'message-circle',
        required: true,
        enabled: true,
        maxLength: 1500,
      },
    },

    interests: [
      { id: 'interest-placeholder', label: 'Select a service...', value: '', enabled: true },
      { id: 'interest-music-distribution', label: 'Music Distribution', value: 'Music Distribution', enabled: true },
      { id: 'interest-youtube-management', label: 'YouTube Management', value: 'YouTube Management', enabled: true },
      { id: 'interest-content-rights', label: 'Content Rights Management', value: 'Content Rights Management', enabled: true },
      { id: 'interest-content-id', label: 'Content ID', value: 'Content ID', enabled: true },
      { id: 'interest-ott', label: 'OTT Distribution', value: 'OTT Distribution', enabled: true },
      { id: 'interest-social', label: 'Social Media Management', value: 'Social Media Management', enabled: true },
      { id: 'interest-analytics', label: 'Analytics and Reporting', value: 'Analytics and Reporting', enabled: true },
      { id: 'interest-other', label: 'Other', value: 'Other', enabled: true },
    ],

    consent: {
      text: 'I agree that LabelAlly Entertainment may use my submitted information to contact me regarding this enquiry.',
      privacyPrefix: 'Read our',
      privacyLabel: 'Privacy Policy',
      privacyHref: '/privacy-policy',
      enabled: true,
    },

    submitLabel: 'Send Message',
    submittingLabel: 'Sending...',
    sendAnotherLabel: 'Send Another Message',

    status: {
      success: {
        heading: 'Message Sent Successfully',
        message:
          'Thank you for reaching out. Our team will review your enquiry and respond soon.',
      },
      errors: {
        serverError:
          'We encountered an error processing your request. Please try again later.',
        rateLimited:
          'Too many requests. Please wait a few minutes before submitting again.',
        networkError:
          'A network or connectivity error occurred. Please check your internet connection and try again.',
      },
    },

    securityNote: {
      text: '',
      enabled: false,
    },
  },
};

export function getPanelContactMethods(sectionData = contactFormSectionData) {
  return (sectionData.contactMethods ?? []).filter(
    (method) => method.enabled && method.showInPanel && method.value
  );
}

export function getStripContactMethods(sectionData = contactFormSectionData) {
  return (sectionData.contactMethods ?? []).filter(
    (method) => method.enabled && method.showInStrip && method.value
  );
}

export function getEnabledInterests(sectionData = contactFormSectionData) {
  return (sectionData.form?.interests ?? []).filter((item) => item.enabled);
}

export default contactFormSectionData;
