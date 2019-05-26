const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation} = require('../validation');

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // check email
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) res.status(400).send('Email existed');

  try {
    const saveUser = await user.save();
    return res.send(saveUser);
  } catch (err) {
    return res.status(400).send(err.errmsg);
  }

});

module.exports = router;
