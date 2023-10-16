require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connection = require('./config/db');
const userRoutes = require('./routes/userRoute');

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
