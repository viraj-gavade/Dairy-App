const express = require('express')
const { CreateDairy, DeleteDairy, UpdateDairy } = require('../Controllers/dairy.controller')


const DairyRouter = express.Router()


DairyRouter.route('/dairy').post(CreateDairy)
DairyRouter.route('/dairy/:id').delete(DeleteDairy).patch(UpdateDairy)




module.exports = DairyRouter