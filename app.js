require('dotenv').config()

const express = require('express')

const app = express()


const connectDB = require('./Database/connect')

app.get('/home',(req,res)=>{
    res.send('<h1>This is the home page</h1>')
})







const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI).then(() => {
    console.log('Database connected Sucessfully!')
  app.listen(port, () => {
    console.log('Server is listening on port:', port);
  });
}).catch(error => console.log('Database connection error:', error));


