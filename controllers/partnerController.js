const models = require("../models");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.setstatus(400).send({ message: "All inputs are required" });
    }
    const existingUser = await models.Partner.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User already exists. Please Log In" });
    }
    const encryptedUserPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.debug(error)
    return res.status(500).send({ message: "Internal Error" });
  }
};

module.exports = { signup };
