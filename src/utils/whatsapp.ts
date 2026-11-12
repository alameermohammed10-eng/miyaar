export const MIYAAR_WHATSAPP_NUMBER = '96897775262';

export const DEFAULT_WHATSAPP_MESSAGE_AR = 'مرحباً، أرغب بالاستفسار عن خدمات مِعيار وطلب تصميم.';
export const DEFAULT_WHATSAPP_MESSAGE_EN = 'Hello, I would like to inquire about Miyaar services and request a design.';

/**
 * Generates standard WhatsApp URL compatible across all mobile devices and desktop browsers.
 */
export function getWhatsAppUrl(customMessage?: string, lang: 'ar' | 'en' = 'ar'): string {
  const text = customMessage || (lang === 'ar' ? DEFAULT_WHATSAPP_MESSAGE_AR : DEFAULT_WHATSAPP_MESSAGE_EN);
  return `https://wa.me/${MIYAAR_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
