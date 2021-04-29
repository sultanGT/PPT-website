import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import route_item from './ppt-routes/route_item.js';
import route_user from './ppt-routes/route_user.js';
import route_purchase from './ppt-routes/route_purchase.js';
import route_saver from './ppt-routes/route_saver.js';

//Proccess .env file
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//moongoose function to connect with PPT's MongoDB database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/PPT-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//PPT web application API's
app.use('/api/saver', route_saver);
app.use('/api/pptusers', route_user);
app.use('/api/pptitems', route_item);
app.use('/api/pptpuchase', route_purchase);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


const __dirname = path.resolve();
app.use('/saver', express.static(path.join(__dirname, '/saver')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

//function to send code:500 error message
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//Host PPT Web app using local ports
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
