import mongoose from 'mongoose';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String },
    idNumber: { type: String },
    email: { type: String, required: true },
    birthday: { type: Date },
    isAdmin: { type: Boolean, default: false },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  { timestamps: true },
);

UserSchema.methods.validatePassword = async function (password) {
  return compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
  );
};

export const userModel = mongoose.model('User', UserSchema);
