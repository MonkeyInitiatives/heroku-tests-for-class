const router = require('express').Router();
const { Users } = require('../../models');
const nodemailer = require("nodemailer");
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const userData = await Users.create(req.body);
    async function main() {
       
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'meal.buddy7@gmail.com', 
            pass: process.env.EMAIL_PASSWORD, 
          },
        });
      
        let info = await transporter.sendMail({
          from: '"Meal Buddy :)" <meal.buddy7@gmail.com>', // sender address
          to: req.body.email , // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Welcome to Meal Buddy! Be sure to check your meals weekly!", // plain text body
          html: "<b>Welcome to Meal Buddy! Be sure to check your meals weekly!</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
      }
      
      main().catch(console.error);
    
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);


    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
