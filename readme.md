# Node JS Mentoring

This is a node js (express) application providing a REST
API to get user and product details.

Follow the below steps to install and query the API.

## Install

    npm install
## docker-compose.yml for mongodb

    docker-compose.yml file in present at `src/config/dockers/docker-compose.yml`
    It contains the instructions to run mongo on docker container

## Follow the steps to install mongodb on docker container 

    Open command promt and navigate to the folder where docker-compose.yaml is located

    # Run in Docker. Use -d flag to run in background
    docker-compose up -d

    # To see the details of all the containers
    docker container ls

    # To execute MongoDB statements against your database instance
    docker exec -it mongo bash
    - type mongo and hit enter to see the details of your mongodb instance
    - 'use mongodb' command creates a db with name mongodb and starts using it

    # Tear down - Stops the container and removes it
    docker-compose down

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

Authentication is done based on the user data available in the database.
You can find User schema at `/src/db/models/user.js` and Product schema at `/src/db/models/product.js`

### Following are the REST endpoints.

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