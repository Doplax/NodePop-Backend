import { Request, Response } from "express";
import handleHttpError from "../utils/errorHandler";
import { tracksList } from "../../public/music/main-music/tracksList";
import User from "../models/User";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send({ data: tracksList });
  } catch (e: any) {
    handleHttpError(res, e);
  }
};

export const getItem = (req: Request, res: Response): void => {
  // Implementation pending
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age, email } = req.body;
    const resDetail = await User.create({
      name,
      age,
      email,
    });
    res.send({ data: resDetail });
  } catch (e: any) {
    handleHttpError(res, e);
  }
};

export const updateItem = (req: Request, res: Response): void => {};

export const deleteItem = (req: Request, res: Response): void => {};