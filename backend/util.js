import jwt from 'jsonwebtoken';
import config from './config';
import dotenv from 'dotenv';
import braintree from 'braintree';

dotenv.config();


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'wkx368364mvsnftm',
  publicKey: 'gp9dg2sdzp9dwkjw',
  privateKey: 'c4214c5989cfd6ee78319d7a3341f9bf'
})

const getToken = (user) => {
    return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
      expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if(token){
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) =>{
      if(err){
        return res.status(401).send({msg: 'InvalidToken'});
      }
      req.user = decode;
      next();
      return
    })
  } else {
    return res.status(401).send({msg: 'Token is not supplied.'})
  }
}

const isAdmin = (req, res, next) =>{
  if(req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({msg: 'Admin Token is not valid.'})
}
export { getToken, isAuth, isAdmin, gateway };
