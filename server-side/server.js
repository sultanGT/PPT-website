import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import routeItem from './ppt-routes/routeItem.js';//edited
import routeCustomer from './ppt-routes/routeCustomer.js';//edited
import routePurchase from './ppt-routes/routePurchase.js';//edited
import routeSaver from './ppt-routes/routeSaver.js';//edited
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Proccess .env file
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//moongoose function to connect with PPT's MongoDB database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/PPT-website', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});
//PPT web application API's for routers and PayPal //edited
app.use('/api/saver', routeSaver);//edited
app.use('/api/PPTusers', routeCustomer);//edited
app.use('/api/pptitems', routeItem);//edited
app.use('/api/pptpuchase', routePurchase);//edited
app.get('/api/config/paypal', (req, res) => {res.send(process.env.PAYPAL_CLIENT_ID || 'sb');});
const __dirname = path.resolve();
app.use('/saver', express.static(path.join(__dirname, '/saver')));//edited
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')));
//function to send code:500 error message
app.use((err, req, res, next) => { res.status(500).send({ message: err.message });});
//Host PPT Web app using local ports 
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Serve at http://localhost:${port}`);});
