import jwt from 'jsonwebtoken';



export const generateToken = (pptuser) => {
  return jwt.sign(
    {
      _id: pptuser._id,
      name: pptuser.name,
      email: pptuser.email,
      userCredentialsAdministrator: pptuser.userCredentialsAdministrator,
    },
    process.env.JWT_SECRET || 'passcodeencrypted',
    {
      expiresIn: '45d',
    }
  );
};

export const userCredentialsAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'passcodeencrypted',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.pptuser = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const userCredentialsAdministrator = (req, res, next) => {
  if (req.pptuser && req.pptuser.userCredentialsAdministrator) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
