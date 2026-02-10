import { Schema, model, Document, Types } from "mongoose";

// Interfaz con los campos del usuario
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

// Esquema Mongoose
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, "The email field is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    //timestamps: true,
  },
);

// Modelo
const User = model<IUser>("User", UserSchema);

export default User;
