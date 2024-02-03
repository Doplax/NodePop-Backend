import { Request, Response, NextFunction } from "express";

class FeaturesController {
  index(req: Request, res: Response, next: NextFunction) {
    res.render("features");
  }
}

export default FeaturesController;
