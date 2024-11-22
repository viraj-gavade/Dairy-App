const express = require('express')
const { SignUpUser,SignInUser,SignOutUser } = require('../Controllers/users.controllers')


const UserRouter = express.Router()


UserRouter.route('/signup').post(SignUpUser)

UserRouter.route('/signin').post(SignInUser)

UserRouter.route('/signout').get(SignOutUser)


module.exports = UserRouter