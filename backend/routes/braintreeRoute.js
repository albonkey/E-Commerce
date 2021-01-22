import express from 'express';
import { isAuth, isAdmin, gateway } from '../util';


const router = express.Router();

router.get('/client_token', async (req,res) => {
  gateway.clientToken.generate({}, (err, response) => {
    res.send(response.clientToken);
  })
})

router.post('/payment', async (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  try{
    let newTransaction = gateway.transaction.sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      }
    }).then(response => {
      res.send(response);
    })

  } catch(error){
    res.status(500).json(error);
  }

})

export default router;
