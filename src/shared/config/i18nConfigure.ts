import i18n from "i18n";
import path from "node:path";

i18n.configure({
  locales: ["en", "es"],
  defaultLocale: "es",
  directory: path.join(__dirname, "../../locales"),
  queryParameter: "lang",
  syncFiles: true,
  autoReload: true,
  updateFiles: false,
  api: {
    __: "translate",
    __n: "translateN",
  },
});

export default i18n;
