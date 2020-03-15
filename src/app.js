
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const apiRoute = require('../api/routing');

//essential middlewares
app.use(express.json()); //bodyParser by express
app.use(morgan('common')); //logger
app.use(cors());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.use('/api', apiRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));