import express from 'express';
import fs from 'fs';
import formidable from 'formidable';
import _ from 'lodash';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req,res) => {
  const products = await Product.find({});
  res.send(products);
})

router.get('/:id', async(req,res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }

})
router.get('/image/:id', async(req, res) => {
  const product = await Product.findOne({ _id: req.params.id});

  if(product.image.data){
    res.set('Content-Type', product.image.contentType);
    return res.send(product.image.data);
  }
})
router.post('/', isAuth, isAdmin, async (req, res) => {
  const form = formidable({multiples: true});

  await form.parse(req, (err, fields, files) => {
    if(err) {

      return res.status(500).send({msg: 'Something went wrong in creating product'});
    }
    const product = new Product(fields);

    product.countInStock = JSON.parse(fields.countInStock);
    product.countInStock['small'] = parseInt(product.countInStock['small'],10);
    product.countInStock['medium'] = parseInt(product.countInStock['medium'],10);
    product.countInStock['large'] = parseInt(product.countInStock['large'],10);

    if(files.image){
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    product.save();
    return res.status(200).send({msg: 'Product Created.'})
  })
})
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  const form = formidable({multiples: true});

  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(500).send({msg: 'Something went wrong in creating product'});
    }

    if(product){
      product.name = fields.name;
      product.description = fields.description;
      product.price = fields.price;
      product.category = fields.category;
      product.countInStock = JSON.parse(fields.countInStock);
      console.log('This image');
      console.log(files.image);
      if(files.image !== undefined){
        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;
      }
      console.log("UPDATED PRODUCT");
      console.log(product);
      const updatedProduct = product.save();
      if(updatedProduct){
        return res.status(200).send({ message: 'Product Updated', data: updatedProduct});
      }
    }


  })
})

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if(deletedProduct){
    await deletedProduct.remove();
    res.status(200).send({msg: 'Product Deleted'});
  } else {
    res.status(500).send({msg: 'Error in removing product'});
  }
})
export default router;
