const express = require('express')
const { SignUpUser,SignInUser,SignOutUser } = require('../Controllers/users.controllers')


const UserRouter = express.Router()


UserRouter.route('/signup').get((req,res)=>{
    res.render('signup')
   }).post(SignUpUser)

UserRouter.route('/signin').get((req,res)=>{
    res.render('signin')
   }).post(SignInUser)

UserRouter.route('/signout').get(SignOutUser)


module.exports = UserRouter