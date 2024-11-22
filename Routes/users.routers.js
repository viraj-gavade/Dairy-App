const express = require('express')
const { SignUpUser } = require('../Controllers/users.controllers')


const UserRouter = express.Router()


UserRouter.route('/signin').post(SignUpUser)

UserRouter.route('/signup').post(SignUpUser)

UserRouter.route('/signout').get(SignUpUser)


module.exports = UserRouter