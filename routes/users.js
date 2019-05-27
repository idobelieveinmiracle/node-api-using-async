const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  // validation
  // const {error} = registerValidation(user);
  // if (error) res.status(400).send(error);

  // check email
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) res.status(400).send('Email existed');

  try {
    const saveUser = await user.save();
    saveUser.password = req.body.password;
    return res.send(saveUser);
  } catch (err) {
    return res.status(400).send(err.errmsg);
  }

});

router.post('/login', async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) return res.status(400).send('Email does not exist');

  const checkPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!checkPassword) return res.status(400).send('Invalid password');

  // create and sign token
  const token = jwt.sign({ _id: user._id, password: req.body.password }, process.env.TOKEN_SECRET);

  res.header('auth-token', token).send(token);
});

module.exports = router;
