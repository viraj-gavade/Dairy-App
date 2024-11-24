const express = require('express')
const { CreateDairy, DeleteDairy, UpdateDairy,GetSingleDairy ,MyDiaries} = require('../Controllers/dairy.controller')
const VerifyJwt = require('../Middlewares/auth.middleware')

const DairyRouter = express.Router()


DairyRouter.route('/dairy').post(VerifyJwt,CreateDairy)
DairyRouter.route('/diary/mydiaries').get(VerifyJwt,MyDiaries)
DairyRouter.route('/diary/:id').get(VerifyJwt,GetSingleDairy).delete(VerifyJwt,DeleteDairy).put(VerifyJwt,UpdateDairy)





module.exports = DairyRouter