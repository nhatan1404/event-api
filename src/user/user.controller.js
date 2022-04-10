import { UserService } from './user.service.js';
import { EventService } from '../event/event.service.js';

const userService = new UserService();
const eventService = new EventService();

export const getAllUsers = async (req, res) => {
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
    return res.success(user);
  } catch (error) {
    return res.internal();
  }
};

export const createUser = async (req, res) => {
  const existUser = await userService.findByEmail(req.body.email);
  if (existUser) {
    return res.unprocessableEntity([
      {
        field: 'email',
        message: 'Email is taken',
      },
    ]);
  }
  delete req.body.repassword;

  if (req.body.phoneNumber) {
    req.body.phoneNumber = formatPhoneNumber(req.body.phoneNumber);
  }

  try {
    const user = await userService.store(req.body);
    delete user.password;
    return res.success(user);
  } catch (error) {
    return res.internal();
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  if (req.body.phoneNumber) {
    req.body.phoneNumber = formatPhoneNumber(req.body.phoneNumber);
  }

  try {
    const updatedUser = await userService.update(userId, req.body);
    return res.success(updatedUser);
  } catch (error) {
    console.log(error);
    res.internal();
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.findById(userId);
    await user.remove();
    return res.noContent();
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const getListEvent = async (req, res) => {
  const user = await userService.findById(req.user._id);
  if (!user) {
    req.logout();
    return res.notFound({ message: 'User not found' });
  }

  const listEvents = await eventService.findByIds(user.events);

  return res.success(listEvents);
};
