const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');

const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


//Connect to database
const connectDB = require('./config/db');
connectDB();


//Init Route
const Routes = require('./routes/index');
Routes(app);

//Override methods
app.use(methodOverride('_method'));


app.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on port ${process.env.PORT}`);   
});


