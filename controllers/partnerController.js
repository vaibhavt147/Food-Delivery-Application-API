const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require("../config/credentials.json")[env];
const token_key = config.TOKEN_KEY

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send({ message: "All inputs are required" });
    }
    const existingPartner = await models.Partner.findOne({ email });
    if (existingPartner) {
      return res
        .status(409)
        .send({ message: "Partner already exists. Please Log In" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const partner = await models.Partner.create({
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    return res.status(201).send({
      message: "New partner created. Login with your email and password",
      partner: partner,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({ message: "All inputs are required" });
    }
    const partner = await models.Partner.findOne({
      where: { email: email },
      raw: true,
    });
    const isPasswordCorrect = await bcrypt.compare(password, partner.password);

    if (partner && isPasswordCorrect) {
      const token = jwt.sign(
        {
          partner_id: partner.id,
          email: partner.email,
          name: partner.name,
        },
        token_key,
        { expiresIn: "1h" }
      );
      return res.status(200).send(token);
    }
    return res.status(400).send({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

const getpartnerinfo = (req, res) => {
  const { exp, iat, ...partnerdata } = req.user;
  return res.status(200).send(partnerdata);
};
module.exports = { signup, login, getpartnerinfo };
