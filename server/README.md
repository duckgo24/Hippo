## Requirements
- Node.js installed
- XAMPP installed

## Steps

1. Install the Project Dependencies
```bash
npm install
```
2. Create a .env File
```env
PORT=8080
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:5000
JWT_SECRET_ACCESS_KEY=
JWT_SECRECT_REFRESH_KEY=
EMAIL_SEND=
EMAIL_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIENT_ID=
CLIENT_SECRET=


VNP_TMN_CODE=
VNP_HASH_SECRET=

```
3. Create the database name in config/config.json (development) and db.js
4. Run auto create database
```bash
npx sequelize-cli db:create  
```
5. Run Database Migrations
```bash
npx sequelize-cli db:migrate
```

6. Run Seeders
```bash
npx sequelize-cli db:seed:all
```

7. Start the Server
```bash
npm start
```
- - -

## Notes
* [How to get password to send email](https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required)

* [How to generate a secure secret key for JWT in Node.js](https://stackoverflow.com/questions/52996555/generate-a-sufficient-secret-for-jwt-nodejs-lambda)