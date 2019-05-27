const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
  const token = req.header('auth-token');
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);  
  } catch {
    return res.status(400).send('token invalid');
  }

  const user = await User.findById({_id: decoded._id});
  if (!user) return res.status(400).send('token invalid');
  const validatePassword = bcrypt.compareSync(decoded.password, user.password);
  if (! validatePassword) return res.status(400).send('token invalid');

  const posts = await Post.find({});
  return res.send(posts);
});

router.post('/', async (req, res) => {
  const token = req.header('auth-token');
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);  
  } catch {
    return res.status(400).send('token invalid');
  }

  const user = await User.findById({_id: decoded._id});
  if (!user) return res.status(400).send('token invalid');
  const validatePassword = bcrypt.compareSync(decoded.password, user.password);
  if (! validatePassword) return res.status(400).send('token invalid');

  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    ofUser: user._id,
  });

  try {
    const savedPost = await post.save();
    return res.send(savedPost);
  } catch {
    return res.status(400).send('cannot post');
  }
});

module.exports = router;
