import multer from 'multer';
import { __dirname, join, path } from '../dirname.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/pdf'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, join(__dirname, '.', 'public', 'images'));
      } else {
        cb(new Error('Tipo de archivo no permitido'));
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
  
export const upload = multer({ storage }).single('image');