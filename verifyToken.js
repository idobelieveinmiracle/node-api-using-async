const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports = async (token) => {
  if (!token) return false;

  const decoded = jwt.verify(token, process.env.TOKEN_SECET);
  console.log(decoded);

  if (!decoded) return false;

  const user = await User.findById({_id: decoded._id});

  if (!user) return false;

  const validatePassword = bcrypt.compareSync(decoded.password, user.password);

  if (! validatePassword) return false;

  return user;
}
