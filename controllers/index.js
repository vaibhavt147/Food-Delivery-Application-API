const models = require("../models");
const helloWorld = async (req, res) => {
  return res.status(200).send({ message: "Hello World" });
};

module.exports = { helloWorld };
