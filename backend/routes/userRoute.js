import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
})

router.post('/signin', async (req, res) => {
  await User.findOne({email: req.body.email}, (error, user) => {
    if(error || !user) {
      return res.status(400).json({
        msg: "Email or Password is wrong."
      });
    }
    console.log(user);
    console.log(user.authenticate(req.body.password));
    if(!user.authenticate(req.body.password)) {
      return res.status(401).json({msg: 'Email and Password is wrong'});
    }

    return res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user)
    });
  });
})

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  const newUser = await user.save();

  if(newUser){
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.'})
  }
})

router.get('/createadmin', async (req, res) => {
  try{
    const user = new User({
      name: 'Carl2',
      email: 'carl_solli222@hotmail.com',
      password: '1234',
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message })
  }
});

router.get('/signout', (req,res) => {
  res.send('User logged out.');
});


export default router;
