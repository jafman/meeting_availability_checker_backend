# MEETING AVAILABILITY CHECKER

## ABOUT
This application connects to the Google Calendar of Multiple users and look for free meeting time slots that suits all the users.

If a slot is found, a Zoom meeting link is created.

## SETUP
- Clone the repo.
- Create a `.env` file at the root and fill in necessary credentials using the `.env.sample` file as a guide.
- Create a `config.js` file in `./modules/google` directory and fill in neccessary credentials using the `./modules/google/config.smple.js` file as a guide.
- Create a `config.js` file in `./modules/zoom` directory and fill in neccessary credentials using the `./modules/zoom/config.smple.js` file as a guide.
- Install all dependencies by running `npm i` from the root.
- Start the Server `npm run dev`

## USER ONBOARDING
To connect to users' google calendar, it is required that they provide consent. I call this Authentication Flow Process 'onbording'. The front end that user engages with can be found here: [https://github.com/jafman/meeting_availability_checker_frontend]('https://github.com/jafman/meeting_availability_checker_frontend')

After a successful Authentication Flow, the refresh token obtained is saved for future use.

## SAMPLE REQUEST

### POST /meeting
```
{
    "email_1": "example1@gmail.com",
    "email_2": "example2@gmail.com",
    "start": "2022-05-27T09:10:00Z",
    "end": "2022-05-27T13:20:59Z"
}
```

## SAMPLE RESPONSE
```
{
    "uuid": "tusxhjhjlxQuMg==",
    "id": 1234,
    "host_id": "xxx-xxx-xx",
    "host_email": "example@gmail.com",
    "topic": "example1@gmail.com and example2@gmail.com meeting",
    "type": 2,
    "status": "waiting",
    "start_time": "2022-05-27T17:00:00Z",
    "duration": 30,
    "timezone": "America/Los_Angeles",
    "agenda": "example1@gmail.com and example2@gmail.com meeting",
    "created_at": "2022-05-27T08:21:05Z",
    "start_url": "https://us05web.zoom.us/sssssss",
    "join_url": "https://us05web.zoom.us/j/jjjjj?pwd=aUFwaXM3Y3d4ahhhhhhQT09",
    "password": "123456",
    "h323_password": "123456",
    "pstn_password": "123456",
    "encrypted_password": "aUFwaXMsss0clhwVlB1QT09",
    "settings": {
    },
    "pre_schedule": false
}
```
