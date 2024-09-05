import mongoose from "mongoose";
const userObj = {
  authId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  notify: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  image: String,
};
const userSchema = new mongoose.Schema(userObj);
const userModel = mongoose.model("users", userSchema);
export default userModel;
