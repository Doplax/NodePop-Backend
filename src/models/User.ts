import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserScheme: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "The email field is required"],
      trim: true, // will remove leading and trailing blanks
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
  }
);

const User = mongoose.model<IUser>("User", UserScheme);

export default User;