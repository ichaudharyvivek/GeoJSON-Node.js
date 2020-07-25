const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' });

// Conect DB
connectDB();

// Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json()); //This is important to get post to api using postman
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

// Routes
app.use('/api/v1/stores', require('./routes/stores'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
