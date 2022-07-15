const express =  require('express')
const addworkson_Controller = require('../controllers/addworkson')

const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addworkson_Controller.getMain)
router.post('/add',addworkson_Controller.postadd)
router.post('/delete/:id/:title',addworkson_Controller.postDelete)
module.exports = router 