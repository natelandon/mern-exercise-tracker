const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log("MongoDb database connection established successfully");
})

//require the files for te routes
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//use the files for the routes
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});
