const express = require('express')
const router = express.Router()
const productcontroller = require('../controller/product')


router.route('/')
      .get(productcontroller.getallproducts)






module.exports= router
