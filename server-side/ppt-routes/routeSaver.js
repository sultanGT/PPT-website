import multer from 'multer';
import express from 'express';
import { userCredentialsAuthenticated } from '../utils.js';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb

//Variable Declarations - //edited
const routeSaver = express.Router();
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

//Variable to save storage using multer library//edited
const image_saver = multer({ storage });

//Api for saving image with new file name
routeSaver.post('/', userCredentialsAuthenticated, image_saver.single('image'), (req, res) => {//edited
  res.send(`/${req.file.path}`);
});
//edited
export default routeSaver;
