import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBRJson from "./translations/pt-BR.json";

i18n.use(initReactI18next).init({
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    pt: ptBRJson,
  },
});

export default i18n;