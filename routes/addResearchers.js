const express =  require('express')
const addreasea_Controller = require('../controllers/addResearcher')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addreasea_Controller.getMain)
router.post('/add',addreasea_Controller.postadd)
router.post('/edit',addreasea_Controller.postedit)
router.post('/delete/:id',addreasea_Controller.postDelete)
module.exports = router 