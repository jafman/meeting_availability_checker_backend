const jwt = require('jsonwebtoken');
const config = require('./config');
const axios = require('axios').default;


const MEETING_PASSWORD = '123456'; // TODO: autogenerate meeting password

//Use the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);

const url = 'https://api.zoom.us/v2/users/me/meetings';

// create zoom meeting
const createMeeting = async (agenda, duration, startTime) => {
  const data = {
    agenda,
    default_password: false,
    topic: agenda,
    type: 2,
    start_time: startTime,
    duration,
    password: MEETING_PASSWORD,
    timezone: 'UTC',
  };

  const options = {
    method: 'POST',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  return new Promise((resolve, reject)=>{
    axios(options).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  }); 
}

module.exports = { createMeeting };