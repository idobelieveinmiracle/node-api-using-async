const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();

dotenv.config();

// connect database
mongoose.connect( process.env.DB_CONNECT, 
  {useNewUrlParser: true},
  () => console.log('connected to the database'));


// static url
app.use('/', express.static('asserts'));

// cors middleware
// app.use(cors);

// body parser middeware
app.use(bodyParser.json());

// routes
app.use('/api/users', require('./routes/users'));

app.listen(process.env.port || 8000, () => console.log('server started'));
