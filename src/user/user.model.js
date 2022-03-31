import mongoose from 'mongoose';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    gender: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String },
    idNumber: { type: String },
    email: { type: String, required: true, unique: true },
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

UserSchema.pre(/^(save|findByIdAndUpdate)/, async function (next) {
  this.password = await hash(this.password, +process.env.BYCRYPT_SALT);
  next();
});

export const userModel = mongoose.model('User', UserSchema);
