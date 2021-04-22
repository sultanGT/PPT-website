import express from 'express';
import expressAsyncHandler from 'express-async-handler'; //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers URL:https://www.npmjs.com/package/express-async-handler
import bcrypt from 'bcryptjs'; 
import data from '../data.js';
import User from '../templates/userTemplate.js';
import { generateToken, userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';


//Variable Declartions - selfcoded
const route_user = express.Router();

//Function to insert commisioned users into PPT web application - selfcoded
route_user.get(
  '/PPTusers',
  expressAsyncHandler(async (req, res) => {
    const ppt_users = await User.insertMany(data.users);
    res.send({ ppt_users });
  })
);

//Function for to login in user from PPT web application - selfcoded
route_user.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ user_email: req.body.user_email });
    if (user) {
      // Decrypt bcrypted password to match with user entered password
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          user_email: user.user_email,
          userCredentialsAdministrator: user.userCredentialsAdministrator,
          user_token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Incorrect login details' });
  })
);

//Function to signup a new user on the PPT database - selfcoded
route_user.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      user_email: req.body.user_email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const pptUser = await user.save();
    res.send({
      _id: pptUser._id,
      name: pptUser.name,
      user_email: pptUser.user_email,
      userCredentialsAdministrator: pptUser.userCredentialsAdministrator,
      user_token: generateToken(pptUser),
    });
  })
);

//Function for authenticating user id - reused
route_user.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Function for updating user credentials - selfcoded
route_user.put(
  '/credentials',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.user_email = req.body.user_email || user.user_email;
      if (req.body.password) {
        // bcrypt used to encrypt passwords for security 
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const ammend_pptuser = await user.save();
      res.send({
        _id: ammend_pptuser._id,
        name: ammend_pptuser.name,
        user_email: ammend_pptuser.user_email,
        userCredentialsAdministrator: ammend_pptuser.userCredentialsAdministrator,
        user_token: generateToken(ammend_pptuser),
      });
    }
  })
);

//Function for finding user - selfcoded
route_user.get(
  '/',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);


//Function for deleting users from PPT web application with the exception of the owners email - selfcoded
route_user.delete(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.user_email === 'sultan.malik@city.ac.uk') {
        res.status(400).send({ message: 'Cannot delete PPT Adminisrators account' });
        return;
      }
      const remove_pptuser = await user.remove();
      res.send({ message: 'User has now been removed from PPT database', user: remove_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

//Function for updating user credential in the PPT web application - selfcoded
route_user.put(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.user_email = req.body.user_email || user.user_email;
      user.userCredentialsAdministrator = Boolean(req.body.userCredentialsAdministrator);
      const ammend_pptuser = await user.save();
      res.send({ message: 'PPT user has now been updated', user: ammend_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

export default route_user;
