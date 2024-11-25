require('dotenv').config()

const DAIRY = require('./Models/dairy.models')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cookieParser());
const session = require('express-session')
const passport = require('passport')


app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
const connectDB = require('./Database/connect')

const VerifyJwt = require('./Middlewares/auth.middleware');


app.use(session({
  secret: process.env.SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const DairyRouter = require('./Routes/dairy.routers')
const UserRouter = require('./Routes/users.routers');
const OauthRouter = require('./Routes/Oauth2.routers')

app.use('/', OauthRouter);                  // OAuth authentication endpoints


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


