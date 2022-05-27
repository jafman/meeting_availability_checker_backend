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