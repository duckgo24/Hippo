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
PORT=
CLIENT_URL=
JWT_SECRET_ACCESS_KEY=
JWT_SECRECT_REFRESH_KEY=
EMAIL_SEND=
EMAIL_PASSWORD=
```
3. Set Up the Database
   * Start Apache and MySQL in XAMPP.
   * Open phpMyAdmin.
   * Create a new database.
   * Update the database name in config/config.json (development) and db.js.
5. Start the Server
```bash
npm start
```
- - -

## Notes
[How to get password to send email](https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required)