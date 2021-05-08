import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import PPTUser from '../ppt-templates/userTemplate.js';
import { generateToken, userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';


//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Variable Declartions - //reused edited
const routeUser = express.Router();


//Function to insert commisioned pptusers into PPT web application - //reused edited
routeUser.get('/PPTuserlist',expressAsyncHandler(async (req, res) => {
  const insert_pptusers = await PPTUser.insertMany(data.pptusers);
  res.send({ insert_pptusers });
  })
);

//Function for to login in pptuser from PPT web application - //reused edited
routeUser.post('/login',expressAsyncHandler(async (req, res) => {
  const pptuser = await PPTUser.findOne({ email: req.body.email });
  if (pptuser) {
      // Decrypt bcrypted user_password to match with pptuser entered user_password
  if (bcrypt.compareSync(req.body.password, pptuser.password)) {
  res.send({
          _id: pptuser._id,
          name: pptuser.name,
          email: pptuser.email,
          userCredentialsAdministrator: pptuser.userCredentialsAdministrator,
          token: generateToken(pptuser),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Incorrect login details' });
  })
);

//Function to signup a new pptuser on the PPT database - //reused edited
routeUser.post('/signup',expressAsyncHandler(async (req, res) => {
  const pptuser = new PPTUser({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
  const new_pptuser = await pptuser.save();
    res.send({
      _id: new_pptuser._id,
      name: new_pptuser.name,
      email: new_pptuser.email,
      userCredentialsAdministrator: new_pptuser.userCredentialsAdministrator,
      token: generateToken(new_pptuser),
    });
  })
);

//Function for authenticating pptuser id - //reused edited
routeUser.get('/:id',expressAsyncHandler(async (req, res) => {
const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {res.send(pptuser);} else {
    res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Function for updating pptuser credentials - //reused edited
routeUser.put('/credentials',userCredentialsAuthenticated,expressAsyncHandler(async (req, res) => {
const pptuser = await PPTUser.findById(req.pptuser._id);
    if (pptuser) {
      pptuser.name = req.body.name || pptuser.name;
      pptuser.email = req.body.email || pptuser.email;
      if (req.body.password) {
        pptuser.password = bcrypt.hashSync(req.body.password, 8);
      }
      const ammend_pptuser = await pptuser.save();
      res.send({
        _id: ammend_pptuser._id,
        name: ammend_pptuser.name,
        email: ammend_pptuser.email,
        userCredentialsAdministrator: ammend_pptuser.userCredentialsAdministrator,
        token: generateToken(ammend_pptuser),
      });
    }
  })
);

//F//reused edited
routeUser.get('/',userCredentialsAuthenticated,userCredentialsAdministrator,expressAsyncHandler(async (req, res) => {
    const pptusers = await PPTUser.find({});
    res.send(pptusers);
  })
);
//Function for deleting pptusers from PPT web application with the exception of the owners email - //reused edited
routeUser.delete('/:id',userCredentialsAuthenticated,userCredentialsAdministrator,
expressAsyncHandler(async (req, res) => {const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {
      if (pptuser.email === 'sultan.malik@city.ac.uk') {
        res.status(400).send({ message: 'Cannot delete PPT Adminisrators account' });
        return;
      }
      const removeCustomer = await pptuser.remove();
      res.send({ message: 'User has now been removed from PPT web application', pptuser: removeCustomer });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

//Function for updating pptuser credential in the PPT web application - //  reused edited
routeUser.put('/:id',userCredentialsAuthenticated,userCredentialsAdministrator,expressAsyncHandler(async (req, res) => {
  const pptuser = await PPTUser.findById(req.params.id);
    if (pptuser) {
      pptuser.name = req.body.name || pptuser.name;
      pptuser.email = req.body.email || pptuser.email;
      pptuser.userCredentialsAdministrator = Boolean(req.body.userCredentialsAdministrator);
      const ammend_pptuser = await pptuser.save();
      res.send({ message: 'User Updated', pptuser: ammend_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

export default routeUser;
