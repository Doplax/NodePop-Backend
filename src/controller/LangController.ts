import { Request, Response, NextFunction } from "express";

class LangController {
  changeLocale(req: Request, res: Response, next: NextFunction): void {
    const locale: string = req.params.locale;

    // Establecer una cookie con el nuevo idioma
    res.cookie("nodeapp-locale", locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
    });

    // Responder con una redirección a la misma página de la que venía
    res.redirect(req.get("referer") || "/");
  }
}

export default LangController;
