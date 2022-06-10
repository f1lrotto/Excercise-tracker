# Excercise-tracker
## Introduction
This is an excercise tracker created with Node.js and express on the back-end, running handlebars on the front-end. It allowes users to register with their username and email. 

After logging in, they can:
- add a new excercise
- view their existing excercises
- edit an existing excercise
- delete an excercise
## Technologies used
Front-end is running handlebars, while back-end is running on Node.js with express

For authentication, bcrypt, passport and passport-local with Local Strategy is used to authenticate using a username and password .

To access the mongoDB database which is hosted on Atlas, I've used mongoose

## Install the dependancies
```
npm install
``` 
## Running the project

### Creating .env file
You need to create a `.env` file in the `/src` directory
In this file you should include:
- `PORT` - on which the application will run on
- `MONGO_URI` - a connect URI to your mongoDB database
- `SECRET` - a string to compute hash for the session
  
### Start the application 
```
npm start
```
### Start the application in development mode (hot-code reloading)
```
npm run dev
```
