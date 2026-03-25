import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome to Melaku Kitchen": "Welcome to Melaku Kitchen",
      "Authentic Ethiopian Food": "Authentic Ethiopian Food",
      "Menu": "Menu",
      "Cart": "Cart",
      "Login": "Login",
      "Logout": "Logout",
      "Language": "Language",
      "Categories": "Categories",
      "Add to Cart": "Add to Cart",
      "Search": "Search...",
      "Total": "Total",
      "Checkout": "Checkout",
      "Contact Us": "Contact Us",
      "About Us": "About Us",
      "Admin Dashboard": "Admin Dashboard",
      "My Orders": "My Orders"
    }
  },
  am: {
    translation: {
      "Welcome to Melaku Kitchen": "እንኳን ወደ መላኩ ኪችን በደህና መጡ",
      "Authentic Ethiopian Food": "እውነተኛ የኢትዮጵያ ምግብ",
      "Menu": "ማውጫ",
      "Cart": "ቅርጫት",
      "Login": "ግባ",
      "Logout": "ውጣ",
      "Language": "ቋንቋ",
      "Categories": "ምድቦች",
      "Add to Cart": "ወደ ቅርጫት አክል",
      "Search": "ፈልግ...",
      "Total": "ድምር",
      "Checkout": "ክፈል።",
      "Contact Us": "አግኙን",
      "About Us": "ስለ እኛ",
      "Admin Dashboard": "የአስተዳዳሪ ክፍል",
      "My Orders": "የእኔ ትዕዛዞች"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
