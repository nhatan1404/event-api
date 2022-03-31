import { UserService } from './user.service.js';
import { EventService } from '../event/event.service.js';

const userService = new UserService();
const eventService = new EventService();

export const getAllUsers = () => async (req, res) => {
  try {
    const listUsers = await userService.findAll();
    return res.success(listUsers);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const showById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.findById(userId);
    if (!user) {
      return res.notFound({ message: `User with id "${userId}" not found` });
    }
    return res.success(user);
  } catch (error) {
    return res.internal();
  }
};

export const createUser = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};

export const getListEvent = async (req, res) => {
  const user = await userService.findById(req.user._id);
  if (!user) {
    req.logout();
    return res.notFound({ message: 'User not found' });
  }

  const listEvents = await eventService.findByIds(user.events);

  return res.success(listEvents);
};
