const express = require('express')
const { 
   CreateDairy, 
   DeleteDairy, 
   UpdateDairy, 
   GetSingleDairy, 
   MyDiaries
} = require('../Controllers/dairy.controller')
const VerifyJwt = require('../Middlewares/auth.middleware')

// Create Express Router
const DairyRouter = express.Router()

// Dairy Creation Route
DairyRouter.route('/dairy')
   .post(VerifyJwt, CreateDairy)

// My Diaries Route
DairyRouter.route('/diary/mydiaries')
   .get(VerifyJwt, MyDiaries)

// Single Diary CRUD Routes
DairyRouter.route('/diary/:id')
   .get(VerifyJwt, GetSingleDairy)
   .delete(VerifyJwt, DeleteDairy)
   .put(VerifyJwt, UpdateDairy)

module.exports = DairyRouter