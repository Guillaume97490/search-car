const DATABASE = require('./database.js');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

if (env == "production"){
  DATABASE.LOCAL.DBNAME = process.env.DB;
  DATABASE.LOCAL.USERNAME = process.env.USER;
  DATABASE.LOCAL.PASSWORD = process.env.PASSWORD;
}

const sequelize = new Sequelize(DATABASE.LOCAL.DBNAME, DATABASE.LOCAL.USERNAME, DATABASE.LOCAL.PASSWORD, { // nom de la BDD, username, password
host: process.env.HOST || 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});

try {
    sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;