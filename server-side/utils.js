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

// export const mailgun = () =>
//   mg({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
//   });

export const orderCompletionEmail = (customer_purchase) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${customer_purchase.pptuser.name},</p>
  <p>We have finished processing your customer_purchase.</p>
  <h2>[Order ${customer_purchase._id}] (${customer_purchase.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Item</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${customer_purchase.items_order
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> $${item.cost.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${customer_purchase.items_cost.toFixed(2)}</td>
  </tr>
  <tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${customer_purchase.delivery_cost.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${customer_purchase.total_cost.toFixed(2)}</strong></td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${customer_purchase.delivery_address.fullName},<br/>
  ${customer_purchase.delivery_address.address},<br/>
  ${customer_purchase.delivery_address.city},<br/>
  ${customer_purchase.delivery_address.county},<br/>
  ${customer_purchase.delivery_address.post_code}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};