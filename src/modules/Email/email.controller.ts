import { Request, Response } from "express";
import handleHttpError from "@/utils/errorHandler";
import { sendEmail } from "@/config/nodemailerConfig";
import contactMeTemplate from "@/modules/Email/templates/contactMeTemplate";

export const contactMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    const subject = "Nuevo mensaje de contacto";

    const mailOptions = {
      from: process.env.EMAIL_FROM || email,
      to: email,
      //replyTo: email,
      ...contactMeTemplate({ name, email, subject, message })
    };
    const result = await sendEmail(mailOptions);
    console.log("Email sent:", result, { name, email, message });

    res.send({ data: result });
  } catch (e: any) {
    handleHttpError(res, e);
  }
};