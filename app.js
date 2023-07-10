const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const partnerRoute = require("./routes/partnerRoute");
const auth_middleware = require("./middleware/auth");

app.get("/healthcheck", (req, res) => {
  return res.status(200).send({
    message: `The Server is running in ${process.env.NODE_ENV} environment`,
  });
});
app.use(auth_middleware);

app.use("/partners", partnerRoute);

app.listen(port, () => {
  console.log(`Server is hosted on http://localhost:${port}`);
});
