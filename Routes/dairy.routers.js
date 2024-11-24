const express = require('express')
const { CreateDairy, DeleteDairy, UpdateDairy,GetSingleDairy } = require('../Controllers/dairy.controller')
const VerifyJwt = require('../Middlewares/auth.middleware')

const DairyRouter = express.Router()


DairyRouter.route('/dairy').post(VerifyJwt,CreateDairy)
DairyRouter.route('/dairy/:id').get(VerifyJwt,GetSingleDairy).delete(VerifyJwt,DeleteDairy).patch(VerifyJwt,UpdateDairy)




module.exports = DairyRouter