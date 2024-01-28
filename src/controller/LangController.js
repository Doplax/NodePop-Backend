class LangController {
  changeLocale(req, res, next) {
    const locale = req.params.locale;

    // Poner una coockie con el nuevo idioma
    res.cookie("nodeapp-locale", locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    // Responder con una redirección a la misma página de la que venia
    res.redirect(req.get("referer"));
  }
}

module.exports = LangController;
