const express = require('express')
const { 
   SignUpUser, 
   SignInUser, 
   SignOutUser, 
   getuserprofile 
} = require('../Controllers/users.controllers')
const VerifyJwt = require('../Middlewares/auth.middleware')

// Create Express Router
const UserRouter = express.Router()

// Signup Routes
UserRouter.route('/signup')
   .get((req, res) => {
       res.render('signup')
   })
   .post(SignUpUser)

// Signin Routes
UserRouter.route('/signin')
   .get((req, res) => {
       res.render('signin')
   })
   .post(SignInUser)

// Signout Route
UserRouter.route('/signout')
   .get(SignOutUser)

// Profile Route
UserRouter.route('/profile')
   .get(VerifyJwt, getuserprofile)

module.exports = UserRouter