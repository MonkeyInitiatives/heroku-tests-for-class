const router = require('express').Router();
const { Meals, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all meals and JOIN with user data
    const mealData = await Meals.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const meals = mealData.map((meal) => meal.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('login', { 
      meals, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/meal/:id', async (req, res) => {
  try {
    const mealData = await Meals.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    const meal = mealData.get({ plain: true });

    res.render('meal', {
      ...meal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meals }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;