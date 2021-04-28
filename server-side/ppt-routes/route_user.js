import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import PPTUser from '../templates/userTemplate.js';
import { generateToken, userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';



//Variable Declartions - selfcoded
const route_user = express.Router();


//Function to insert commisioned pptusers into PPT web application - selfcoded
route_user.get(
  '/PPTuserlist',
  expressAsyncHandler(async (req, res) => {
    const insert_pptusers = await PPTUser.insertMany(data.pptusers);
    res.send({ insert_pptusers });
  })
);

//Function for to login in pptuser from PPT web application - selfcoded
route_user.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const pptuser = await PPTUser.findOne({ user_email: req.body.user_email });
    if (pptuser) {
      // Decrypt bcrypted user_password to match with pptuser entered user_password
      if (bcrypt.compareSync(req.body.password, pptuser.password)) {
        res.send({
          _id: pptuser._id,
          name: pptuser.name,
          user_email: pptuser.user_email,
          userCredentialsAdministrator: pptuser.userCredentialsAdministrator,
          user_token: generateToken(pptuser),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Incorrect login details' });
  })
);

//Function to signup a new pptuser on the PPT database - selfcoded
route_user.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const pptuser = new PPTUser({
      name: req.body.name,
      user_email: req.body.user_email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const new_pptuser = await pptuser.save();
    res.send({
      _id: new_pptuser._id,
      name: new_pptuser.name,
      user_email: new_pptuser.user_email,
      userCredentialsAdministrator: new_pptuser.userCredentialsAdministrator,
      user_token: generateToken(new_pptuser),
    });
  })
);

//Function for authenticating pptuser id - reused
route_user.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {
      res.send(pptuser);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Function for updating pptuser credentials - selfcoded
route_user.put(
  '/credentials',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const pptuser = await PPTUser.findById(req.pptuser._id);
    if (pptuser) {
      pptuser.name = req.body.name || pptuser.name;
      pptuser.user_email = req.body.user_email || pptuser.user_email;
      if (req.body.password) {
        pptuser.password = bcrypt.hashSync(req.body.password, 8);
      }
      const ammend_pptuser = await pptuser.save();
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

//Function for finding pptuser - selfcoded
route_user.get(
  '/',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const pptusers = await PPTUser.find({});
    res.send(pptusers);
  })
);

//Function for deleting pptusers from PPT web application with the exception of the owners email - selfcoded
route_user.delete(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {
      if (pptuser.user_email === 'sultan.malik@city.ac.uk') {
        res.status(400).send({ message: 'Cannot delete PPT Adminisrators account' });
        return;
      }
      const remove_pptuser = await pptuser.remove();
      res.send({ message: 'User has now been removed from PPT web application', pptuser: remove_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

//Function for updating pptuser credential in the PPT web application - selfcoded
route_user.put(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {
      pptuser.name = req.body.name || pptuser.name;
      pptuser.user_email = req.body.user_email || pptuser.user_email;
      pptuser.userCredentialsAdministrator = Boolean(req.body.userCredentialsAdministrator);
      // pptuser.userCredentialsAdministrator = req.body.userCredentialsAdministrator || pptuser.userCredentialsAdministrator;
      const ammend_pptuser = await pptuser.save();
      res.send({ message: 'User Updated', pptuser: ammend_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

export default route_user;
