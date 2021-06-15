// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Users = require('./Users');

// Initialize Meals model (table) by extending off Sequelize's Model class
class Meals extends Model {}

// set up fields and rules for Meals model
Meals.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: 'id'
      }
    },

    day: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type_of_meal: {
        type: DataTypes.STRING,
        allowNull: true
    },
  },
  {
  
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meals',
  }
);

module.exports = Meals;