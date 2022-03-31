import multer from 'multer';
import multerOptions from '../shared/multerOptions.js';

const uploadMiddleware = multer(multerOptions);

export default uploadMiddleware;
