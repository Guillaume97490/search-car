const sequelize = require('../config/database/connect').sequelize;
const DataTypes = require('sequelize');

const Search = sequelize.define('search', {
  brand: {type: DataTypes.STRING(45), allowNull: false},
  model: {type: DataTypes.STRING(45), allowNull: false},
}, 

{
  tableName: 'searchs', underscored: true, paranoid: true
});



module.exports = Search;