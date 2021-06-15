const Users = require('./users');
const Meals = require('./meals');

Users.hasMany(Meals, {
    foreignKey: 'user_id'
});

Meals.belongsTo(Users, {
    foreignKey: 'user_id'
});


module.exports = { Users, Meals };