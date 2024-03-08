var session = require("express-session");
var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  clientId: "food-delivery-api-client",
  bearerOnly: false,
  serverUrl: "http://localhost:8080/auth",
  realm: "food-delivery",
  credentials: {
    secret: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
  },
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
