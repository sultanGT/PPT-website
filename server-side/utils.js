import jwt from 'jsonwebtoken';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//create token for users to login to web app as an identifier
export const generateToken = (customer) => {
return jwt.sign({_id: customer._id,name: customer.name,email: customer.email,userCredentialsAdministrator: customer.userCredentialsAdministrator,},//reused edited
process.env.JWT_SECRET || 'passcodeencrypted',//reused edited
{expiresIn: '45d',});//reused edited
};

//admin authentication variable for verifiying users as admin using tokens
export const userCredentialsAuthenticated = (req, res, next) => {const authorization = req.headers.authorization; //reused edited
if (authorization) {const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
jwt.verify(token,process.env.JWT_SECRET || 'passcodeencrypted',//reused edited
(err, decode) => {if (err) {
res.status(401).send({ message: 'Invalid Token' });} else {req.customer = decode;
next();
}});
  } else {res.status(401).send({ message: 'No Token' });}
};
//variable for comparing user and admin tokens
export const userCredentialsAdministrator = (req, res, next) => {
if (req.customer && req.customer.userCredentialsAdministrator) {//reused edited
next();
} else {res.status(401).send({ message: 'Invalid Admin Token' });}
};
