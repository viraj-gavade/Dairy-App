// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Import custom modules
const DAIRY = require('./Models/dairy.models');
const connectDB = require('./Database/connect');
const VerifyJwt = require('./Middlewares/auth.middleware');

// Import route modules
const DairyRouter = require('./Routes/dairy.routers');
const UserRouter = require('./Routes/users.routers');
const OauthRouter = require('./Routes/Oauth2.routers');

// Initialize Express application
const app = express();

// Middleware configurations
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes configuration
app.use('/', OauthRouter);                  // OAuth authentication endpoints

// Home route with JWT verification
app.get('/home', VerifyJwt, async (req, res) => {
  try {
    // Fetch user's dairy entries
    const dairy = await DAIRY.find({ createdBy: req.user });
    
    // Create preview of dairy entries
    const previewDairies = dairy.map(d => ({
      ...d.toObject(),
      preview: d.body.substring(0, 150) + (d.body.length > 150 ? '...' : ''),
    }));

    // Render home page with user and dairy data
    res.render('home', {
      user: req.user,
      dairy: previewDairies, 
    });
  } catch (err) {
    // Handle errors during dairy fetching
    res.status(500).send('Internal Server Error');
  }
});



//Router to navigate to the homepage 
app.get('/',(req,res)=>{
  res.redirect('/home')
})

// API routes
app.use('/api/v1', DairyRouter);
app.use('/api/v1/user', UserRouter);




// Server and database connection
const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch(error => console.error('Database connection error:', error));