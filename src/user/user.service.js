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
    return this.model.findById(id);
  }

  async findByIds(ids) {
    return this.model.find({
      _id: { $in: ids },
    });
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async addEventToList(id, eventId) {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { events: { _id: eventId } } },
      { upsert: true },
    );
  }
}
