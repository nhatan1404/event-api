import { Router } from 'express';
import { toDataURL } from 'qrcode';
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  showById,
  updateEvent,
} from './event.controller.js';

const eventRouter = Router();
eventRouter.get('/', getAllEvent);
eventRouter.post('/', createEvent);
// eventRouter.put('/qr/:id', async (req, res) => {
//   try {
//     toDataURL(`/info/${req.params.id}`, async (err, url) => {
//       const updateEvent = await findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: { qrImage: url },
//         },
//         { new: true },
//       );
//       res.status(200).json(updateEvent);
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

eventRouter.get('/:id', showById);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);

export default eventRouter;
