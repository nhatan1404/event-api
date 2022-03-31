import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

const multerOptions = {
  limits: {
    fileSize: process.env.MAX_FILE_SIZE,
  },

  fileFilter: (req, file, cb) => {
    const allowExt = process.env.ALLOWED_EXT_IMAGE;
    if (allowExt) {
      const ext = Array.from(allowExt);
      const allowExt = ext.join('|');
      const regex = new RegExp(`(${allowExt})$`);

      if (file.mimetype.match(regex)) {
        cb(null, true);
      } else {
        cb(
          new BadRequestException(
            `Không hỗ trợ file định dạng ${extname(file.originalname)}`,
          ),
          false,
        );
      }
    } else {
      cb(null, true);
    }
  },

  storage: diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = process.env.UPLOAD_PATH_DEFAULT;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export default multerOptions;
