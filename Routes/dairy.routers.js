const express = require('express')
const { CreateDairy, DeleteDairy, UpdateDairy } = require('../Controllers/dairy.controller')
const VerifyJwt = require('../Middlewares/auth.middleware')

const DairyRouter = express.Router()


DairyRouter.route('/dairy').post(CreateDairy)
DairyRouter.route('/dairy/:id').delete(VerifyJwt,DeleteDairy).patch(UpdateDairy)




module.exports = DairyRouter