require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
require('./config/db');

const firebaseConfig = require('./config/firebase');
const { initializeApp } = require('firebase/app');

// Initialize firebase app
initializeApp(firebaseConfig);
const userRoutes = require('./routes/userRoute');

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
