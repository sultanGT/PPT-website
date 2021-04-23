import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      user_email: user.user_email,
      userCredentialsAdministrator: user.userCredentialsAdministrator,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const userCredentialsAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const user_token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      user_token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const userCredentialsAdministrator = (req, res, next) => {
  if (req.user && req.user.userCredentialsAdministrator) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const orderCompletionEmail = (customer_order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${customer_order.user.name},</p>
  <p>We have finished processing your customer_order.</p>
  <h2>[Order ${customer_order._id}] (${customer_order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${customer_order.orderProducts
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${customer_order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${customer_order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${customer_order.deliveryPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${customer_order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${customer_order.deliveryAddress.fullName},<br/>
  ${customer_order.deliveryAddress.address},<br/>
  ${customer_order.deliveryAddress.city},<br/>
  ${customer_order.deliveryAddress.county},<br/>
  ${customer_order.deliveryAddress.postCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};