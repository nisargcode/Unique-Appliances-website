export const shop = {
  name: "Unique Appliances",
  tagline: "All Type Home Appliance Sales & Service",
  phonePrimary: "9904070071",
  phoneSecondary: "9898340063",
  customerCare: "95865 33005",
  whatsapp: "919904070071",
  email: "uniiqueappliiance@gmail.com",
  instagram: "uniiqueappliiance",
  address:
    "20 Panchratan Appartment, Near Crystal School, Waghodia Dabhoi Ring Road, Vadodara",
  hours: [
    { day: "Monday – Saturday", time: "9:30 AM – 9:00 PM" },
    { day: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],
  mapsUrl: "https://maps.app.goo.gl/BVan3QaZX9JS4yMK8",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.9163911508555!2d73.23561865993751!3d22.29065498011298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc570e79bef4f%3A0xe1ceaff37c52a580!2sPancharatna%20Complex%2C%20Krushnakunj%2C%20Kendranagar%2C%20Vadodara%2C%20Gujarat%20390025!5e0!3m2!1sen!2sin!4v1784439804095!5m2!1sen!2sin",
} as const;

export const telHref = (num: string) => `tel:+91${num.replace(/\s/g, "")}`;
export const waHref = (msg?: string) =>
  `https://wa.me/${shop.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
