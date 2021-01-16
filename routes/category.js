const express = require('express')
const category = require('../controller/category')

 module.exports = app => {
    const api = express.Router()

    app.post('/createCategory' , category.createCategory)
    //app.use('/',api)

    module.exports = api
 }
