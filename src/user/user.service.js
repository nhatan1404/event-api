import { userModel } from './user.model.js';

export class UserService {
  constructor() {
    this.model = userModel;
  }

  async store(userData) {
    const createdUser = new this.model(userData);
    return createdUser.save();
  }

  async findById(id) {
    return this.model.findOne(id);
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }
}
