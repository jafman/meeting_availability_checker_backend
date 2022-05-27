const express = require('express');
const cors = require('cors');
const { getAccessToken,  getUrl } = require('./modules/google/auth');
const onboardingRoute = require('./routers/onboarding');
const meetingRoute = require('./routers/meeting');
const { initDBClient } = require('./db');
const port = 8000;
let db;

const appConfig = (app) => {

  app.use(cors());
  app.use(express.json());

  app.use('/onboard', (req, res, next) => {
      req.db = db;
      next();
    }, onboardingRoute);

  app.use('/meeting', (req, res, next) => {
      req.db = db;
      next();
    }, meetingRoute);

  app.get('/', (req,res)=>{
    res.status(200).json({
      status: 'Success',
      message: 'working...'
    })
  });

  app.get('/auth_url',(req, res)=>{
    res.status(200).json({
      status: 'Success',
      authUrl: getUrl()
    })
  });       

  initDBClient().then( (database) => {
    db = database;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  }).catch(error => {
    console.log(error);
    console.log('Error connecting to DB, exiting...');
  });
}

module.exports = { appConfig };