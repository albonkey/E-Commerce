import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import data from './data';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import braintreeRoute from './routes/braintreeRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log('error.reason'));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/braintree', braintreeRoute);
app.use('/api/orders', orderRoute);


app.listen(5000, console.log('Server started at localhost 5000'));
