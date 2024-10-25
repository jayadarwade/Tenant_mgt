# VRI/OPI Backend

## Getting Started

To get started with this project, follow these steps:

### Technology Stack:->

- NPM v10.8.2
- Node.js v22.5.1 (LTS)
- Express v4.19.2
- MySQL2 for the database v3.11.3

## BEFORE INSTALL NEED TO MAKE CHANGES IN .env FILE 

- Please use xampp or any other phpMyAdmin tool to use MySQL2
- Before running migration & seeder please remove "type": "module" from package.json then use following command :
```bash
npx sequelize-cli db:migrate
```
```bash
npx sequelize-cli db:seed:all
```
- After running migration & seeder added "type": "module" in package.json

## BEFORE INSTALL NEED TO MAKE CHANGES IN .env FILE

1. SERVER_URL
   PORT=http://YourHostName:PORT

2. DATABASE
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   DB_PORT=
   DB_DIALECT = 

### GITIGNORE

- package-lock.json
- node_modules
- .npm
- .env

### INSTALL & Run PROCESS

- npm install
- Change database details in .env file
```bash
npm run build
```
```bash
npm start
```
