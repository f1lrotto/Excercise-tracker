# Exercise-tracker
## Check out the app
This application is hosted [here](https://excercise-tracker-f1lrotto.herokuapp.com/).
## Introduction
This is an exercise tracker that allowes users to track progress on their fitness journey!

To start using the application, user first needs to register an account with their username and email. 

User can then access all of theirs existing excercises, add a new exercise, edit and delete them. It uses sessions, so even after reloading the page, user stays logged in until they themselves log out. 

This application has all of its endpoints protected, so if no one is logged in, you can't access anything else than a login/register screen, in order not to expose any data to unauthorised users.

### Functionality
- register an account
- after logging in:
  - view all existing excercises
  - add a new exercise, with its description, duration and date when it was performed
  - edit an existing exercise
  - delete a specific exercise
### Technologies used
Front-end is created with **handlebars**, while back-end is running on **Node.js** with **express**

This application stores its data on a **mongoDB** database that is hosted on Atlas. To access the mongoDB database, **mongoose** is used

For authentication **bcrypt**, **passport** and **passport-local** with Local Strategy is used to authenticate an user with their username and password.


## Running the project

### Install the dependancies
```
npm install
``` 
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
