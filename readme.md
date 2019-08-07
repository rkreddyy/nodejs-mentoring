# Node JS Mentoring

This is a node js (express) application providing a REST
API to get user and product details.

Follow the below steps to install and query the API.

## Install

    npm install

## Sequelize set up models, migrations and seeding

    .sequelizerc file is configured with required paths

    Run the following commands to generate the models, db, migrations and seeding data

    npx sequelize init
    npx sequelize-cli model:generate --name User --attributes firstname:string,lastname:string,email:string,username:string,password:string
    npx sequelize-cli model:generate --name Product --attributes name:string,price:float,reviews:text
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli seed:generate --name create-users // dont run this if users seed is already present
    npx sequelize-cli db:seed:all

## Run the app

    npm start

    Application starts on localhost port - 8080 

## REST API

Following are the REST endpoints.
Authentication is done based on the user data available at `\src\data\users.json`.

METHOD     |  END-POINT                 | ACTION
-----------|----------------------------|--------
GET        |  /api/products             |  Return ​ALL​ products
GET        |  /api/products/:id         |  Return ​SINGLE​ product
GET        |  /api/products/:id/reviews |  Return ​ALL​ reviews for a single product
POST       |  /api/products             |  Add ​NEW​ product and return it
GET        |  /api/users                |  Return ​ALL​ users
POST       |  /api/auth                 |  Returns an access token after verifying the username and password passed in the body
POST       |  /api/auth/local           |  Same as /api/auth, but uses passport-local strategy for authentication
GET        |  /api/auth/facebook        |  Authenticates user with passport-facebook strategy
GET        |  /api/auth/google          |  Authenticates user with passport-google strategy
GET        |  /api/auth/twitter         |  Authenticates user with passport-twitter strategy