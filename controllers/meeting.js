const { getAccessTokenFromDB, getFreeBusy } = require('../modules/google/auth');

const meeting = async (req, res) => {
  const { body: { email_1, email_2, start, end }, db } = req;
  if(!email_1 || !email_2){
    res.status(400).json({
      status: 'Error',
      message: 'Missing email'
    })
  } else {
    
    const accessToken_1 = await getAccessTokenFromDB(email_1, db);
    const accessToken_2 = await getAccessTokenFromDB(email_2, db);

    if (accessToken_1 && accessToken_2) {
      console.log('accessToken_1: ', accessToken_1);
      console.log('accessToken_2: ', accessToken_2);
      let freebusy = {};
      try {
        const freeBusy_1 = await getFreeBusy(accessToken_1, start, end, email_1);
        const freeBusy_2 = await getFreeBusy(accessToken_2, start, end, email_2);
        freebusy[email_1] = freeBusy_1;
        freebusy[email_2] = freeBusy_2;
        res.status(200).json(freebusy);
      } catch (error) {
        res.status(500).json({
          status: 'Error',
          error: error
        })
      }
      
      
    } else {
      if(!accessToken_1){
        res.status(400).json({
          status: 'Error',
          message: `${email_1} not onboarded`
        })
      }
      if(!accessToken_2 && accessToken_1){
        res.status(400).json({
          status: 'Error',
          message: `${email_2} not onboarded`
        })
      }
    }
  }
}

module.exports = { meeting };