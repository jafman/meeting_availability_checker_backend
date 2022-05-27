const { getAccessTokenFromDB, getFreeBusy } = require('../modules/google/auth');
const { compareShedules } = require('../utils/meeting');
const { createMeeting } = require('../modules/zoom');
const MEETING_DURATION = 30; // minutes

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
      //console.log('accessToken_1: ', accessToken_1);
      //console.log('accessToken_2: ', accessToken_2);
      try {
        const freeBusy_1 = await getFreeBusy(accessToken_1, start, end, email_1);
        const freeBusy_2 = await getFreeBusy(accessToken_2, start, end, email_2);
        const busy_1 = freeBusy_1.calendars[email_1].busy;
        const busy_2 = freeBusy_2.calendars[email_2].busy;
        const availableSlot = compareShedules(busy_1, busy_2, start, end);
        if(availableSlot){

          try{
            const title = `${email_1} and ${email_2} meeting`;
            const meeting = await createMeeting(title, MEETING_DURATION, availableSlot.start);
            res.status(201).json(meeting);
          } catch(error){
            console.log(error);
          }
          
        } else {
          res.status(200).json({
            status: 'Error',
            message: 'No available slot'
          })
        }
        //freebusy[email_1] = freeBusy_1;
        //freebusy[email_2] = freeBusy_2;
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 'Error',
          error: 'An error occurred!'
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
