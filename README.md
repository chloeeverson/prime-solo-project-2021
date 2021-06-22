# packMe

## About

The goal of this app is to create an easier way to manage and organize packing for upcoming travel. 

A user will be able to create their own packing lists on the app and keep track of which items they packed using a checkbox system.

Users can make multiple lists, edit & reuse lists, and save their lists to return to at any time.

Technologies used: 
- JavaScript
- React
- Redux
- Sagas
- Passport
- HTML
- CSS
- Material UI
- PostgreSQL
- Node
- Express

Future builds: Feature to generate suggested packing items based on prompts using weather API


## Setup 

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
- Replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. 
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

- If you would like to name your database something else, you will need to change `packMe` to the name of your new database name in `server/modules/pool.js`

## Screenshots

![SignIn](images/signIn.png)
![SignUp](images/signUp.png)
![Prompt](images/prompt.png)
![NewList](images/newList.png)
![Home](images/home.png)
![SavedList](images/savedList.png)

