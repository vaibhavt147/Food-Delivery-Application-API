const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is hosted on http://localhost:${port}`);
});
