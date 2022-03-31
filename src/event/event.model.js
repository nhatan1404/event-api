import mongoose from 'mongoose';
import QRCode from 'qrcode';

export const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    address: { type: String, required: true },
    qrImage: { type: String },
    quantity: { type: Number, required: true },
    placeHost: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    timeStart: { type: Date, required: true },
    timeFinish: { type: Date, required: true },
    participantList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

EventSchema.pre('save', function (next) {
  const data = `${process.env.QR_URL}/${this._id.toString()}`;
  QRCode.toDataURL(data)
    .then((url) => {
      this.qrImage = url;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

export const eventModel = mongoose.model('Event', EventSchema);
