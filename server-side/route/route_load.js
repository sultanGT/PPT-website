import multer from 'multer';
import express from 'express';
import { userCredentialsAuthenticated } from '../utils.js';

const route_load = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

route_load.post('/', userCredentialsAuthenticated, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default route_load;
