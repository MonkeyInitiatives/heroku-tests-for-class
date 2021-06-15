const router = require('express').Router();
const userRoute = require('./userRoute');
const mealRoute = require('./mealRoute');

router.use('/users', userRoute);
router.use('/meals', mealRoute);

module.exports = router;