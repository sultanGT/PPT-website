import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import routeItem from './ppt-routes/routeItem.js';
import routeUser from './ppt-routes/routeUser.js';
import routePurchase from './ppt-routes/routePurchase.js';
import routeSaver from './ppt-routes/routeSaver.js';

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
app.use('/api/saver', routeSaver);
app.use('/api/pptusers', routeUser);
app.use('/api/pptitems', routeItem);
app.use('/api/pptpuchase', routePurchase);
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
