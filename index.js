const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const listRoutes = require('./routes/lists.routes.js');
const cors = require('cors');

const port=process.env.port || 3000;
const app= express();
dotenv.config();



app.use(cors());
app.use(express.json());
app.use("/api", listRoutes);





app.listen(port, () => {    
    ConnectDB();
   
    console.log('Server is running on port 3000');
});