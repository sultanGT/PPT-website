import multer from 'multer';
import express from 'express';
import { userCredentialsAuthenticated } from '../utils.js';

//Variable Declarations
const route_saver = express.Router();
// API for uploading image to local save_localy in uploads folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
// saves Image as jpg format
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

//Variable to save storage using multer library
const image_saver = multer({ storage });

//Api for saving image with new file name
route_saver.post('/', userCredentialsAuthenticated, image_saver.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default route_saver;
