# rest-api-test

> Simple rest API to persist unique values for users on a DB.

## Build Setup

Ensure that both npm and mongodb are installed

``` bash
# install dependencies
npm install

# create a folder in the root directory for the database
mkdir data/

# start the mongo service, pointing at the newly created folder
mongod --dbpath {PATH_TO_PROJECT}/data

# open a new terminal and start the server
nodemon server.js
```

To access the service, you can use cURL, or optionally use Postman with this collection:
https://www.getpostman.com/collections/3f4421b5a41c77ef079a

Please ensure that you set up an environment, with one variable, `hostname` that either points to http://localhost:3000 (if running locally) or https://obscure-journey-41983.herokuapp.com (live hosted)

You can also go to my website, https://jessdesr.codes to find a little secret! 🙂  On the page, try inputting the [Konami Code](https://en.wikipedia.org/wiki/Konami_Code)

(If that doesn't work, the secret is available at https://jessdesr.codes/#/secretsauce)

This was quite a bit of fun!
