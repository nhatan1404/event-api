import { EventService } from './event.service.js';

const eventService = new EventService();

export const getAllEvent = async (req, res) => {
  try {
    const listEvents = await eventService.findAll();
    res.status(200).json(listEvents);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const showById = async (req, res) => {
  try {
    const event = await userService.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createEvent = async (req, res) => {
  try {
    const saveEvent = await eventService.store(req.body);
    res.status(200).json(saveEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updateEvent = await findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json('The event has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
