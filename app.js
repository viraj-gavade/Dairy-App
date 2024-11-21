require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
const connectDB = require('./Database/connect')
const DairyRouter = require('./Routes/dairy.routers')

app.get('/home',(req,res)=>{
    res.send('<h1>This is the home page</h1>')
})

app.use('/api/v1',DairyRouter)

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI).then(() => {
    console.log('Database connected Sucessfully!')
  app.listen(port, () => {
    console.log('Server is listening on port:', port);
  });
}).catch(error => console.log('Database connection error:', error));


