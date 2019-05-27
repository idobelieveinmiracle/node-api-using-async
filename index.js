const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();


// cors middleware
// app.use(cors);

dotenv.config();

// connect database
mongoose.connect( process.env.DB_CONNECT, 
  {useNewUrlParser: true},
  () => console.log('connected to the database'));


// static url
app.use('/', express.static('asserts'));

// body parser middeware
app.use(bodyParser.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.listen(process.env.port || 8000, () => console.log('server started'));
