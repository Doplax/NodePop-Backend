import { Request, Response } from "express";
import User, { IUser } from "../models/User.model";
import handleHttpError from "../shared/utils/errorHandler";
import { encrypt, compare } from "../shared/utils/handlePassword";
import { tokenSign } from "../shared/utils/handleJwt";

const { matchedData } = require("express-validator");

export const registerCtrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = matchedData(req);

    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      handleHttpError(res, "ERROR_REGISTER_USER_ALREADY_EXISTS", 409);
      return;
    }

    const password = await encrypt(data.password);
    const body = { ...data, password };
    const dataUser = await User.create(body);
    dataUser.set("password", undefined, { strict: false });

    const result = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201).send({ data: result });
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = matchedData(req);
    const user = await User.findOne({ email: data.email });

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");
    const check = await compare(data.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const token = await tokenSign(user);
    res.send({ token });
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

export const getAllUsersCtrl = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_GET_ALL_USERS");
  }
};
