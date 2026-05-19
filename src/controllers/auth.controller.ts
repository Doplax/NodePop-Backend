import { Request, Response } from "express";
import { matchedData } from "express-validator";
import User from "../models/User.model";
import handleHttpError from "../shared/utils/errorHandler";
import { encrypt, compare } from "../shared/utils/handlePassword";
import { tokenSign } from "../shared/utils/handleJwt";

const sanitizeUser = (user: { _id: unknown; email: string }) => ({
  _id: user._id,
  email: user.email,
});

export const registerCtrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = matchedData(req) as { email: string; password: string };

    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      handleHttpError(res, "ERROR_REGISTER_USER_ALREADY_EXISTS", 409);
      return;
    }

    const password = await encrypt(data.password);
    const created = await User.create({ email: data.email, password });

    res.status(201).send({
      data: {
        token: await tokenSign(created),
        user: sanitizeUser(created),
      },
    });
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = matchedData(req) as { email: string; password: string };
    const user = await User.findOne({ email: data.email }).select(
      "+password email _id",
    );

    if (!user) {
      handleHttpError(res, "INVALID_CREDENTIALS", 401);
      return;
    }

    const check = await compare(data.password, user.password);
    if (!check) {
      handleHttpError(res, "INVALID_CREDENTIALS", 401);
      return;
    }

    const token = await tokenSign(user);
    res.send({ token, user: sanitizeUser(user) });
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

export const meCtrl = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    handleHttpError(res, "ERROR_UNAUTHORIZED", 401);
    return;
  }
  res.send({ data: sanitizeUser(req.user as { _id: unknown; email: string }) });
};
