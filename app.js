const express = require('express')

const app = express()


app.get('/home',(req,res)=>{
    res.send('<h1>This is the home page</h1>')
})



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('Server is listinig on port:-',port)
})