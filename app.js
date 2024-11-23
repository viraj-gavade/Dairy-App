require('dotenv').config()

const DAIRY = require('./Models/dairy.models')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
const connectDB = require('./Database/connect')

const DairyRouter = require('./Routes/dairy.routers')
const UserRouter = require('./Routes/users.routers');
const VerifyJwt = require('./Middlewares/auth.middleware');

app.get('/home', VerifyJwt, async (req, res) => {
  try {
    const dairy = await DAIRY.find({ createdBy: req.user });
    const previewDairies = dairy.map(d => ({
      ...d.toObject(),
      preview: d.body.substring(0, 150) + (d.body.length > 150 ? '...' : ''),
    }));

    console.log(req.user);
    res.render('home', {
      user: req.user,
      dairy: previewDairies, 
    });
  } catch (err) {
    console.error('Error fetching dairies:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/api/v1',DairyRouter)
app.use('/api/v1/user',UserRouter)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Views directory:', app.get('views'));

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI).then(() => {
    console.log('Database connected Sucessfully!')
  app.listen(port, () => {
    console.log('Server is listening on port:', port);
  });
}).catch(error => console.log('Database connection error:', error));


