const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const dotenv = require('dotenv');


dotenv.config();

const app = express();

const server = http.createServer(app);
app.use(bodyParser.json());


app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

//Init Socket
const initSocket = require('./socket/');
initSocket(server);



//Connect to database
const connectDB = require('./config/db');
connectDB();


//Init Route
const Routes = require('./routes/index');
Routes(app);

//Override methods
app.use(methodOverride('_method'));



server.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on port ${process.env.PORT}`);   
});


