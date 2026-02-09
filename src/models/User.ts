import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import nodemailer from "nodemailer";
import emailTransportConfigure from "../lib/emailTransportConfigure";
import canalPromise from "../lib/rabbitMQLib";

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  comparePassword(passwordEnClaro: string): Promise<boolean>;
  sendEmail(
    asunto: string,
    cuerpo: string,
  ): Promise<nodemailer.SentMessageInfo>;
  sendEmailRabbitMQ(asunto: string, cuerpo: string): Promise<void>;
}

interface UserModel extends Model<UserDoc> {
  hashPassword(passwordEnClaro: string): Promise<string>;
}

const usuarioSchema = new mongoose.Schema<UserDoc>({
  email: { type: String, unique: true },
  password: String,
});

usuarioSchema.statics.hashPassword = function (passwordEnClaro: string) {
  return bcrypt.hash(passwordEnClaro, 7);
};

usuarioSchema.methods.comparePassword = function (
  this: UserDoc,
  passwordEnClaro: string,
) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

usuarioSchema.methods.sendEmail = async function (
  this: UserDoc,
  asunto: string,
  cuerpo: string,
) {
  const transport = await emailTransportConfigure();

  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo,
  });

  console.log(
    `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`,
  );
  return result;
};

usuarioSchema.methods.sendEmailRabbitMQ = async function (
  this: UserDoc,
  asunto: string,
  cuerpo: string,
) {
  const canal = await canalPromise;

  const exchange = "email-request";
  await canal.assertExchange(exchange, "direct", {
    durable: true,
  });

  const mensaje = {
    asunto,
    cuerpo,
  };

  canal.publish(exchange, "*", Buffer.from(JSON.stringify(mensaje)), {
    persistent: true,
  });
};

const User = mongoose.model<UserDoc, UserModel>("User", usuarioSchema);

export default User;
