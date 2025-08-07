import i18n from "i18n";
import path from "node:path";

// Configuración de i18n
i18n.configure({
  locales: ["en", "es"],
  directory: path.join(__dirname, "../modules/locales/"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true,
  cookie: "nodeapp-locale",
});

// Establecer localización por defecto (opcional, ya se establece arriba)
i18n.setLocale("en");

export default i18n;
