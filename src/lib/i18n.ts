export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    markets: "Markets",
    hedge: "Hedge Simulator",
    contracts: "Contracts",
    alerts: "Price Alerts",
    learn: "Learn",
    profile: "Profile",
    
    // Crops
    mustard: "Mustard",
    groundnut: "Groundnut",
    soybean: "Soybean",
    sunflower: "Sunflower",
    
    // Common
    price: "Price",
    forecast: "Forecast",
    viewDetails: "View Details",
    create: "Create",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    loading: "Loading...",
    noData: "No data available",
    
    // Dashboard
    currentPrice: "Current Price",
    priceChange: "24h Change",
    aiForecast: "AI Forecast",
    days: "Days",
    confidence: "Confidence",
    "Login to Kisan Vyapaar": "Login to Kisan Vyapaar",
  "Phone number": "Phone number",
  "Get OTP": "Get OTP",
  "Please enter a valid phone number": "Please enter a valid phone number",
  "Something went wrong while sending OTP": "Something went wrong while sending OTP",
    // Status
    active: "Active",
    draft: "Draft",
    completed: "Completed",
    expired: "Expired",
    open: "Open",
    closed: "Closed",
  },
  
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    markets: "बाजार",
    hedge: "हेज सिम्युलेटर",
    contracts: "अनुबंध",
    alerts: "मूल्य अलर्ट",
    learn: "सीखें",
    profile: "प्रोफ़ाइल",
    "Login to Kisan Vyapaar": "किसान व्यापार में लॉगिन करें",
  "Phone number": "फ़ोन नंबर",
  "Get OTP": "ओटीपी प्राप्त करें",
  "Please enter a valid phone number": "कृपया मान्य फ़ोन नंबर दर्ज करें",
  "Something went wrong while sending OTP": "ओटीपी भेजने में समस्या हुई",
    
    // Crops
    mustard: "सरसों",
    groundnut: "मूंगफली",
    soybean: "सोयाबीन",
    sunflower: "सूरजमुखी",
    
    // Common
    price: "मूल्य",
    forecast: "पूर्वानुमान",
    viewDetails: "विवरण देखें",
    create: "बनाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    loading: "लोड हो रहा है...",
    noData: "कोई डेटा उपलब्ध नहीं",
    
    // Dashboard
    currentPrice: "वर्तमान मूल्य",
    priceChange: "24 घंटे परिवर्तन",
    aiForecast: "एआई पूर्वानुमान",
    days: "दिन",
    confidence: "विश्वास",
    
    // Status
    active: "सक्रिय",
    draft: "मसौदा",
    completed: "पूर्ण",
    expired: "समाप्त",
    open: "खुला",
    closed: "बंद",
    "Verify OTP": "ओटीपी सत्यापित करें",
    "Enter OTP": "ओटीपी दर्ज करें",
    "Invalid or expired OTP": "अमान्य या समाप्त ओटीपी",
    "Error verifying OTP": "ओटीपी सत्यापन में त्रुटि",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
