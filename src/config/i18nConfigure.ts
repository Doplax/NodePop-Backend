import i18n from "i18n";
import path from "node:path";

i18n.configure({
  locales: ["en", "es"],
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true,
  cookie: "nodeapp-locale",
});

i18n.setLocale("en");

// exportar
export default i18n;