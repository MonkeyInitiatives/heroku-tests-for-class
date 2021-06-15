const router = require('express').Router();
const { Meals } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const mealData = await Meals.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    res.status(200).json(mealData);
    return mealData
  } catch {
    res.status(400).json(err);
  }
});

  router.post('/', withAuth, async (req, res) => {
    try {
      const newMeal = await Meals.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newMeal);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const mealData = await Meals.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!mealData) {
        res.status(404).json({ message: 'No meal found with this id!' });
        return;
      }

      res.status(200).json(mealData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
