const jwt = require("jsonwebtoken");

// a middleware function to check if the user is authenticated
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: "failed",
      message: "You are not authorized to perform this action.",
    });
  }
  // check if the user is authenticated
  const token = req.headers.authorization.split(" ")[1];

  // get token from the request header
  const secret = `$N7Xc#u@*2DC7sy$34%dVz#5^!3E&u`;
  if (token) {
    let decoded = null;
    try {
      // verify the token
      decoded = jwt.verify(token, secret);
    } catch (error) {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized to perform this action.",
      });
    }

    // if the token is valid, continue to the next router
    req.adminData = decoded;
    next();
  }
};
