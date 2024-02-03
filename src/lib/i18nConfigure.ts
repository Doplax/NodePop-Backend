// Librerias
import i18n from "i18n";
import path from "node:path";

const directoryPath = path.join(__dirname, "..", "locales");
console.log(directoryPath);

// Instancia
i18n.configure({
  locales: ["en", "es"],
  directory: directoryPath,
  defaultLocale: "en",
  autoReload: true, // watch for changes in JSON files to relad locale on updates
  syncFiles: true, // sync local files information across all files
  cookie: "nodeapp-locale",
});

// Para script
i18n.setLocale("en");

export {i18n};
