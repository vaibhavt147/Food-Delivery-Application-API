const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config/credentials.json")[env];
const token_key = config.TOKEN_KEY;
const whitelistedAPIs = ["/partners/signup", "/partners/login", "/healthcheck"];

const verifyToken = (req, res, next) => {
  if (whitelistedAPIs.includes(req.path)) {
    console.log(`${req.path} is whitelisted`);
  } else {
    const bearer_token = req.headers["authorization"];
    if (!bearer_token) {
      return res
        .status(403)
        .send({ message: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(bearer_token.split(" ")[1], token_key);
      req.user = decoded;
    } catch (error) {
      return res.status(401).send({ message: "Invalid Token" });
    }
  }

  next();
};

module.exports = verifyToken;
