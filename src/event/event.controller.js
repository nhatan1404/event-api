import { EventService } from './event.service.js';
import { UserService } from '../user/user.service.js';
import sendMail from '../common/utils/sendMail.util.js';
import uploadMiddleware from '../common/middlewares/upload.middleware.js';
import { remove, checkPathExists } from '../common/utils/file.util.js';

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

export const getListEventByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.findById(userId);
    const listEvents = await eventService.findByIds(user.events);
    return res.success(listEvents);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const getListUserByEventId = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await eventService.findById(eventId);
    const listUsers = await userService.findByIds(event.participantList);
    return res.success(listUsers);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const showById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await eventService.findById(eventId);
    return res.success(event);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const createEvent = async (req, res) => {
  let data = req.body;
  try {
    uploadMiddleware.single('image')(req, res, (err) => {
      if (err) return res.error(err);
    });

    const image = req.file;
    if (!req.body.image && !image) {
      return res.unprocessableEntity([
        {
          field: 'image',
          message: 'Image is required',
        },
      ]);
    }

    if (image) {
      data = {
        ...data,
        image: image.path,
      };
    }

    console.log(data);
    const saveEvent = await eventService.store(data);
    return res.success(saveEvent);
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const updateEvent = async (req, res) => {
  let data = req.body;
  const eventId = req.params.id;
  let oldImage = '';

  try {
    const image = req.file;
    if (!req.body.image && !image) {
      return res.unprocessableEntity([
        {
          field: 'image',
          message: 'Image is required',
        },
      ]);
    }

    if (image) {
      const event = await eventService.findById(eventId);
      oldImage = event.image;
      data = {
        ...data,
        image: image.path,
      };
    }

    const updateEvent = await eventService.update(eventId, data);
    return res.success(updateEvent);
  } catch (error) {
    console.log(error);
    return res.internal();
  } finally {
    (async () => {
      const isLocalImg = await checkPathExists(oldImage);
      if (isLocalImg) {
        await remove(oldImage);
      }
    })();
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
      await eventService.addUserToList(event._id, user._id);
      await userService.addEventToList(user._id, event._id);

      const bodyHtmlEmail = `
        Xin chào, <strong>${user.firstName}</strong>.<br />
        Bạn đã đăng ký tham gia sự kiện "${event.title}" thành công!<br />
        Xin cảm ơn <br />
        `;
      const subject = `Xác nhận đăng ký sự kiện "${event.title}"`;

      await sendMail(user.email, '', bodyHtmlEmail, subject);
      return res.success({ message: 'Sign up for the event successfully' });
    }
    return res.notFound({ message: `User with id ${userId} does not exist` });
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};

export const clearAllData = async (req, res) => {
  try {
    await eventService.clear();
    return res.success({ message: 'Clear successfully' });
  } catch (error) {
    console.log(error);
    return res.internal();
  }
};
