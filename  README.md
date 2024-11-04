# Tenant Mgt

## Getting Started

To get started with this project, follow these steps:

### Technology Stack:->

- NPM v10.8.2
- Node.js v22.5.1 (LTS)
- Express v4.19.2
- Mongoose for the database ^8.7.2

## AFTER INSTALL NEED TO MAKE CHANGES IN .env FILE

1. SERVER_URL
   PORT= 3050

2. DATABASE
   mongoURI

3. FOR JWT TOKEN
   ACCESS_TOKEN_SECRET
   REFRESH_TOKEN_SECRET

4. baseUrl ='http://localhost:3050/'

## BEFORE INSTALL NEED TO MAKE CHANGES IN .env FILE 

- Please use MongoDb Compass or any other MongoDb tool to use mongoose
- Then run seeder please:
```bash
node user_seed.js
```

### GITIGNORE

- package-lock.json
- node_modules
- .npm
- .env

### INSTALL & Run PROCESS

- npm install
- Change database details in .env file
```bash
node app.js
```
