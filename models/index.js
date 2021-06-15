const Users = require('./Users');
const Meals = require('./Meals');

Users.hasMany(Meals, {
    foreignKey: 'user_id'
});

Meals.belongsTo(Users, {
    foreignKey: 'user_id'
});


module.exports = { Users, Meals };