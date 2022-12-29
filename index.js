const express = require("express")
const cors = require('cors')
const port = process.env.PORT || 5000;
require('colors')

const app = express();

//middleware 
 app.use(cors())
 app.use(express.json())


 app.get('/', async(req, res)=>{
    res.send('Tasks Manager Server is Running')
 })


app.listen(port, ()=> console.log(`Task Manager Running on port ${port}`.cyan.bold))