import { userModel } from './user.model.js';

export class UserService {
  constructor() {
    this.model = userModel;
  }

  async findAll() {
    return this.model.find().sort({ _id: -1 });
  }

  async store(userData) {
    const createdUser = new this.model(userData);
    return createdUser.save();
  }

  async update(userId, userData) {
    return this.model.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      { new: true },
    );
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
