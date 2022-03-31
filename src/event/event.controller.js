import { EventService } from './event.service.js';
import { UserService } from '../user/user.service.js';

const eventService = new EventService();
const userService = new UserService();

export const getAllEvent = async (req, res) => {
  try {
    const listEvents = await eventService.findAll();
    return res.success(listEvents);
  } catch (error) {
    return res.internal();
  }
};

export const showById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await userService.findById(eventId);
    if (!event) {
      return res.notFound({ message: `Event with ${eventId} does not exist` });
    }
    return res.success(event);
  } catch (error) {
    return res.internal();
  }
};

export const createEvent = async (req, res) => {
  try {
    const saveEvent = await eventService.store(req.body);
    return res.success(saveEvent);
  } catch (error) {
    return res.internal();
  }
};

export const updateEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const updateEvent = await eventService.update(eventId, req.body);
    return res.success(updateEvent);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    await destroy(eventId);
    return res.noContent();
  } catch (error) {
    return res.internal();
  }
};

export const joinEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.body.userId;

  try {
    const event = await eventService.findById(eventId);
    if (event) {
      if (event.participantList.length === event.quantity) {
        return res.error({ message: 'Out of registrations' });
      }

      const user = await userService.findById(userId);

      if (user) {
        const isUserAlreadyRegistered = event.participantList.find(
          (par) => par._id.toString() === user._id.toString(),
        );

        if (isUserAlreadyRegistered) {
          return res.error({ message: 'Registration already registered' });
        }
        event.participantList.push({ _id: user._id });
        user.events.push({ _id: event._id });
        await event.save();
        await user.save();
        return res.success({ message: 'Sign up for the event successfully' });
      }
      return res.notFound({ message: 'User not found' });
    }
    return res.notFound({ message: 'Event not found' });
  } catch (error) {
    return res.internal();
  }
};

export const clearAllData = async (req, res) => {
  try {
    await eventService.clear();
    return res.success({ message: 'Clear successfully' });
  } catch (error) {
    return res.internal();
  }
};
