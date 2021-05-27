import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  id: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
