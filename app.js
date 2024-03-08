const express = require("express");
const bodyParser = require("body-parser");
// const keyCloakNew = require("./services/keycloak/keycloakService");
const partnerRoute = require("./routes/partnerRoute");
const auth_middleware = require("./middleware/auth");

const session = require("express-session");
const Keycloak = require("keycloak-connect");
const memoryStore = new session.MemoryStore();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  return res.status(200).send({
    message: `The Server is running in ${process.env.NODE_ENV} environment`,
  });
});

// app.use(
//   session({
//     secret: "your-session-secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: "food-delivery",
    clientId: "food-delivery-api-client",
    bearerOnly: false,
    serverUrl: "http://127.0.0.1:4000/",
    credentials: {
      secret: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
    },
  }
);

// const keycloak = new Keycloak();

// app.use(() => {
//   keycloak.init({ onLoad: "login-required" }).success((authenticated) => {
//     if (authenticated) {
//       console.debug("Done");
//     } else {
//       console.debug("Not correct");
//     }
//   });
// });

app.use(keycloak.middleware());

// app.use(async () => {
//   try {
//     const users = await keycloak.adminClient.users.find();
//     console.debug(users);
//   } catch (error) {
//     crossOriginIsolated.debug(error);
//   }
// });

(async () => {
  try {
    await keycloak.adminClient.users.find().then((users) => {
      console.debug("List of all users:", users);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
})();

// app.use(auth_middleware);

// app.use("/partners", partnerRoute);

app.listen(port, () => {
  console.log(`Server is hosted on http://localhost:${port}`);
});
