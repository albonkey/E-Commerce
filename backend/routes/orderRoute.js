import express from 'express';
import { Order, CartItem } from '../models/orderModel';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
})
router.post('/create', async (req, res) => {
  const data = req.body;
  let bulkOps = data.products.map(item => {

    //Change this code when you get time, cuz it sucks.
    if(item.size === 'small'){
      return {
        updateOne: {
          filter: {_id: item.product},
          update: { $inc: {"countInStock.small": -item.qty} }
        }
      }
    } else if(item.size === 'medium'){
      return {
        updateOne: {
          filter: {_id: item.product},
          update: { $inc: {"countInStock.medium": -item.qty} }
        }
      }
    } else if(item.size === 'large'){
      return {
        updateOne: {
          filter: {_id: item.product},
          update: { $inc: {"countInStock.large": -item.qty} }
        }
      }
    }

  });
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if(error){
      return res.status(400).json({
        msg: "Could not update product: " + error
      })
    }
  })


  const order = new Order(data);

  order.save((error, data) => {
    if(error){
      res.status(400).json({message: "Something went wrong in creating order."})
    }
    res.send(data);
  })
})

export default router;
