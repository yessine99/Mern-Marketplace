const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, config.jwt_access_secret, (err) => {
    if (err) return res.sendStatus(401);
    next();
  });
};

module.exports = verifyJWT;
