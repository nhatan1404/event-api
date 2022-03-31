import { eventModel } from './event.model.js';

export class EventService {
  constructor() {
    this.model = eventModel;
  }

  async findAll() {
    return this.model.find().sort({ _id: -1 });
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async store(eventData) {
    const createdEvent = new this.model(eventData);
    return createdEvent.save();
  }

  async update(id, eventData) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: eventData,
      },
      { new: true },
    );
  }

  async destroy(id) {
    return this.model.findOneAndDelete(id);
  }

  async clear() {
    return this.model.remove({});
  }
}
