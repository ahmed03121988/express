const express = require('express');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); 
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};


app.use(express.static('public'));


app.set('view engine', 'ejs');


app.get('/', workingHoursMiddleware, (req, res) => {
  res.render('home');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
  res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
  res.render('contact');
});

