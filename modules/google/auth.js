const {google} = require('googleapis');
const oauth2V2 = google.oauth2('v2');
const calendar = google.calendar('v3');
const { googleCredentials } = require('./config');
const { getOne } = require('../../utils/db');
const axios = require('axios').default;

const oauth2Client = new google.auth.OAuth2(
  googleCredentials.client_id,
  googleCredentials.client_secret,
  googleCredentials.redirect_uri
);

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

// generate a url that asks permissions for Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const getUrl = () => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope: scopes
  });
  return url;
}

const getAccessToken = async (code) => {
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  try {
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.log(error);
    return '';
  }
  
}

// get user details from google api
const getUserDetails = (accessToken) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  return new Promise((resolve, reject) => {
    oauth2V2.userinfo.get({
      auth: oauth2Client,
      fields: 'email,name'
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.data);
      }
    });
  });
}

// get refresh token from database
// TODO: check if access token is valid, if not use refresh token to get new access token
const getAccessTokenFromDB = async (email, db) => {
  const query = { email };
  const result = await getOne(db, 'users', query);
  if(result){
    return result.access_token;
  } else {
    return false;
  }
}

const getFreeBusy = async (accessToken, start, end, email) => {
  const url = 'https://www.googleapis.com/calendar/v3/freeBusy';
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        timeMin: start,
        timeMax: end,
        timeZone: 'UTC',
        items: [{ id: email }]
      }
    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}

module.exports = { getUrl, getAccessToken, getUserDetails, getAccessTokenFromDB, getFreeBusy };