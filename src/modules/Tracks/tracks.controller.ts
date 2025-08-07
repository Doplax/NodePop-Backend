import { Request, Response } from "express";
import handleHttpError from "@/utils/errorHandler";
import { tracksList as mainMusicTracks } from "../../public/music/main-music";
import { tracksList as lofiMusicTracks } from "../../public/music/lofi-music";
import User from "@/modules/Products/Models/User.model";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTracks = [...mainMusicTracks, ...lofiMusicTracks];
    res.send({ data: allTracks });
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