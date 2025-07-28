import { Request, Response } from "express";

const changeLocale = (req: Request, res: Response): void => {
  const { locale } = req.params;
  res.cookie("nodeapp-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.redirect(req.get("referer") || "/");
};

export default changeLocale;