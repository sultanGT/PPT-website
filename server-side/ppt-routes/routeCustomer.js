import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import Customer from '../ppt-templates/customerTemplate.js';
import { generateToken, userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';

//https://github.com/basir/amazona/blob/master/backend/routers/userRouter.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Variable Declartions - //reused edited
const routeCustomer = express.Router();


//Function to insert commisioned PPTusers into PPT web application - //reused edited
routeCustomer.get('/PPTuserlist',expressAsyncHandler(async (req, res) => {
  const insert_pptusers = await Customer.insertMany(data.PPTusers);
  res.send({ insert_pptusers });
  })
);

//Function for to login in customer from PPT web application - //reused edited
routeCustomer.post('/login',expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findOne({ email: req.body.email });
  if (customer) {
      // Decrypt bcrypted user_password to match with customer entered user_password
  if (bcrypt.compareSync(req.body.password, customer.password)) {
  res.send({_id: customer._id,name: customer.name,email: customer.email,userCredentialsAdministrator: customer.userCredentialsAdministrator,token: generateToken(customer),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Incorrect login details' });
  })
);

//Function to signup a new customer on the PPT database - //reused edited
routeCustomer.post('/signup',expressAsyncHandler(async (req, res) => {
  const customer = new Customer({name: req.body.name,email: req.body.email,password: bcrypt.hashSync(req.body.password, 8),
    });
  const new_pptuser = await customer.save();
    res.send({_id: new_pptuser._id,name: new_pptuser.name,email: new_pptuser.email,userCredentialsAdministrator: new_pptuser.userCredentialsAdministrator,token: generateToken(new_pptuser),
    });
  })
);

//Function for authenticating customer id - //reused edited
routeCustomer.get('/:id',expressAsyncHandler(async (req, res) => {
const customer = await Customer.findById(req.params.id);
    if (customer) {res.send(customer);} else {
    res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Function for updating customer credentials - //reused edited
routeCustomer.put('/credentials',userCredentialsAuthenticated,expressAsyncHandler(async (req, res) => {
const customer = await Customer.findById(req.customer._id);
    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      if (req.body.password) {
        customer.password = bcrypt.hashSync(req.body.password, 8);
      }
      const amend_pptuser = await customer.save();
      res.send({_id: amend_pptuser._id,name: amend_pptuser.name,email: amend_pptuser.email,userCredentialsAdministrator: amend_pptuser.userCredentialsAdministrator,token: generateToken(amend_pptuser),
      });
    }
  })
);

//F//reused edited
routeCustomer.get('/',userCredentialsAuthenticated,userCredentialsAdministrator,expressAsyncHandler(async (req, res) => {
    const PPTusers = await Customer.find({});
    res.send(PPTusers);
  })
);
//Function for deleting PPTusers from PPT web application with the exception of the owners email - //reused edited
routeCustomer.delete('/:id',userCredentialsAuthenticated,userCredentialsAdministrator,
expressAsyncHandler(async (req, res) => {const customer = await Customer.findById(req.params.id);
    if (customer) {
      if (customer.email === 'sultan.malik@city.ac.uk') {
        res.status(400).send({ message: 'Cannot delete PPT Adminisrators account' });
        return;
      }
      const removeCustomer = await customer.remove();
      res.send({ message: 'User has now been removed from PPT web application', customer: removeCustomer });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

//Function for updating customer credential in the PPT web application - //  reused edited
routeCustomer.put('/:id',userCredentialsAuthenticated,userCredentialsAdministrator,expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
    if (customer) {
      customer.name = req.body.name || customer.name;customer.email = req.body.email || customer.email;customer.userCredentialsAdministrator = Boolean(req.body.userCredentialsAdministrator);
      const amend_pptuser = await customer.save();
      res.send({ message: 'User Updated', customer: amend_pptuser });
    } else {
      res.status(404).send({ message: 'User cannot be found on the PPT web application' });
    }
  })
);

export default routeCustomer;
