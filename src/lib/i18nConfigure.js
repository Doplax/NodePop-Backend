// Librerias
const i18n = require("i18n");
const path = require("node:path");

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

module.exports = i18n;
