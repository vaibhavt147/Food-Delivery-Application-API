const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/credentials.json")[env];
const db = {};
// TODO : Extract this config from config file. use process.env.NODE_ENV to get the env and using the creds accordingly. For now the config is hardcoded

// handle if url doen't exist in config
const sequelize = new Sequelize(config.postgres.options);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Database Connection has been established successfully to " +
        env +
        " environment."
    );
  })
  .catch((err) => {
    console.log(
      "Unable to connect to the " +
        env +
        " database:" +
        JSON.stringify(err, null, 2)
    );
  });

sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
