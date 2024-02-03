import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render("create-product");
  } catch (err) {
    next(err);
  }
});

export default router;
