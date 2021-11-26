const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const personRoutes = require('./resources/persons/person.router');

connectDB();
app.use(express.json());  
app.use(cors())
app.get('/',(req,res)=>res.status(202).send(' API Running...111!!'));




app.use('/api/persons', personRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));