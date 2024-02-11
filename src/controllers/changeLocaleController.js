const changeLocale = (req, res) => {
  const { locale } = req.params;
  console.log(locale);
  res.cookie("nodeapp-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.redirect(req.get("referer"));
};

module.exports = changeLocale;
