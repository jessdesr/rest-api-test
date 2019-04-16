# rest-api-test

> Simple rest API to persist unique values for users on a DB.

Deployed to https://obscure-journey-41983.herokuapp.com

UI found at https://jessdesr.codes
> It's dangerous to go alone! Take this. [Konami Code](https://en.wikipedia.org/wiki/Konami_Code)
> (Alternatively, the UI is available at https://jessdesr.codes/#/secretsauce)

## Prerequisites

* [node](https://nodejs.org/en/download/)
* [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

## Setup

``` bash
# Clone project
git clone git@github.com:jessdesr/rest-api-test.git && cd rest-api-test

# install dependencies
npm install

# create a folder in the root directory for the database
mkdir data/
```

## Run

```bash
# start the mongo service, pointing at the newly created folder
mongod --dbpath {PATH_TO_PROJECT}/data

# open a new terminal and start the server
node server.js
```

## API
If you're using postman, here's the [collection](https://www.getpostman.com/collections/3f4421b5a41c77ef079a)
Ensure environment includes `hostname` variable set to http://localhost:3000 (if running locally) or https://obscure-journey-41983.herokuapp.com (live hosted)

### Authentication
Requests should include `Authorization: Bearer <API Key>` header
API Key can be obtained by creating an account `https://jessdesr.codes/#/secretsauce`

### Endpoints
https://documenter.getpostman.com/view/4002774/S1EQUymM
