const jwt = require("jsonwebtoken");

const token_key = process.env.token_key;
const whitelistedAPIs = ["/partners/signup"];
const isAPIwhitelisted = (urlpath) => {
  return whitelistedAPIs.includes(urlpath);
};
const verifyToken = (req, res, next) => {
  if (isAPIwhitelisted(req.path)) {
    console.log(`${req.path} is whitelisted`);
  } else {
    const bearer_token = req.headers["authorization"];
    const token = bearer_token.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .send({ message: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(token, token_key);
      req.user = decoded;
    } catch (error) {
      return res.status(401).send({ message: "Invalid Token" });
    }
  }

  next();
};

module.exports = verifyToken;
