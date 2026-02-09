import { Request, Response, NextFunction } from "express";

class UsersController {
  public new(req: Request, res: Response, next: NextFunction) {
    res.render("users-new");
  }
}

export default UsersController;
