const { Sequelize } = require('sequelize');

const dbName = 'hippo';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: dbName,
    username: 'root',
    password: 'Test@123',
    port: 3306,
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await sequelize.query(`USE \`${dbName}\`;`);

        await sequelize.authenticate();
        console.log('Connection Database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
