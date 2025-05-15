const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const userRoutes=require("./routes/user.routes.js")
const listRoutes = require('./routes/lists.routes.js');
const cors = require('cors');
const cookieParser= require('cookie-parser')

const port=process.env.port || 3000;
const app= express();
dotenv.config();



app.use(cors({
  origin: ['http://localhost:5173', 'https://toodoosfrontend.netlify.app/'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(cookieParser())
app.use(express.json());
app.use("/api", listRoutes);
app.use("/api", userRoutes);





app.listen(port, () => {    
    ConnectDB();
   
    console.log('Server is running on port 3000');
});