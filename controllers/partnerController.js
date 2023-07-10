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
        .setstatus(409)
        .send({ message: "User already exists. Please Log In" });
    }
    encryptedUserPassword = await bcrypt.hash(password, 10);
    
  } catch (error) {
    return res.setstatus(500).send({ message: "Internal Error" });
  }
};

module.exports = { signup };
