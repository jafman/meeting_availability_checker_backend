const { getAccessToken, getUserDetails } = require('../modules/auth');
const { insert, getOne, updateOne } = require('../utils/db');

const onboarding = async (req, res) => {
  const { body: { code }, db } = req;

  if(code && db){
    const accessToken = await getAccessToken(code);
    if(accessToken == ''){
      res.status(400).json({
        status: 'Error',
        message: 'Invalid Grant'
      })
    } else {
      const tokenSaved = await saveTokens(accessToken, db);
      if(tokenSaved){
        res.status(200).json({
          status: 'Success',
          message: 'User Onboarded!'
        })
      } else {
        res.status(400).json({
          status: 'Error',
          message: 'Error saving tokens'
        })
      }

    }
  } 
  
  if(!code) {
    res.status(400).json({
      status: 'Error',
      message: 'Missing code'
    })
  }

  if(!db) {
    res.status(500).json({
      status: 'Error',
      message: 'A fatal error occurred!'
    })
  }
}


const saveTokens = async (accessToken, db) => {

  const userDetails = await getUserDetails(accessToken.access_token);
  const { email, name } = userDetails;
  const user = { email, name, ...accessToken };
  const userOnboarded = await getOne(db, 'users', { email });
  if(userOnboarded){
    const updated = await updateOne(db, 'users', { email }, { ...accessToken });
    console.log('updated token');
    return true;
  } else {
    const saved = await insert(db, 'users', user);
    console.log('saved token');
    return saved;
  }
  
}

module.exports = { onboarding };