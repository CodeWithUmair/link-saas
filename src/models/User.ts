import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  password: String, // optional for OAuth
  emailVerified: Date,
  provider: String,
});


export const User = models?.User || model('User', UserSchema);