const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomstrintg134ljsdr";

async function auth(secret) {
  return function (req, res, next) {
    const token = req.body.token;
    const response = jwt.verify(token, secret);

    if (response) {
      req.id = response.id;
      next();
    } else {
      res.status(403).send({
        message: "You are not signed in",
      });
    }
  };
}

module.exports = {
  JWT_SECRET,
  auth,
};
