const express = require('express')
const { SignUpUser,SignInUser,SignOutUser,getuserprofile } = require('../Controllers/users.controllers')
const VerifyJwt = require('../Middlewares/auth.middleware')


const UserRouter = express.Router()


UserRouter.route('/signup').get((req,res)=>{
    res.render('signup')
   }).post(SignUpUser)

UserRouter.route('/signin').get((req,res)=>{
    res.render('signin')
   }).post(SignInUser)

UserRouter.route('/signout').get(SignOutUser)

UserRouter.route('/profile').get(VerifyJwt,getuserprofile)


module.exports = UserRouter