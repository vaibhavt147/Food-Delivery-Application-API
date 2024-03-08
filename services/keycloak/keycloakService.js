const KeycloakAdminClient = require("keycloak-admin-client");

// import KcAdminClient from "@keycloak/keycloak-admin-client";
const KcAdminClient = require("keycloak-admin-client");

const kcAdminClient = new KcAdminClient({ baseUrl: "localhost:4000/auth" });

const credentials = {
  grantType: "client_credentials",
  clientId: "food-delivery-api-client",
  clientSecret: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
};

const adminClient = new KeycloakAdminClient({
  baseUrl: "http://localhost:4000/auth",
  realmName: "food-delivery",
  client_id: "food-delivery-api-client",
  accessToken: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
  clientId: "food-delivery-api-client",
  clientSecret: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
});

let execute = async () => {
  try {
    await adminClient.auth({
      clientId: "food-delivery-api-client",
      clientSecret: "h8GFOzYF4tau1gVHptoBzZAtw2N3NA6U",
    });
    const users = await adminClient.users.find();
    console.debug(users);
  } catch (error) {
    console.error("Failed to authenticate Keycloak Admin Client:", error);
  }
};

const authenticateKeycloakAdminClient = async () => {
  try {
    console.debug(kcAdminClient)
    await kcAdminClient.auth(credentials);
    const users = await kcAdminClient.users.find({ first: 0, max: 10 });
    // await adminClient.auth();
    console.log("Keycloak Admin Client authenticated");
    console.debug("Keycloak Admin Client authenticated");
  } catch (error) {
    console.error("Failed to authenticate Keycloak Admin Client:", error);
    console.debug("error happneed");
  }
};

module.exports = {
  execute,
  authenticateKeycloakAdminClient,
  adminClient,
};
