const express =  require('express')
const addfundi_Controller = require('../controllers/addfundingpr')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addfundi_Controller.getMain)
router.post('/add', addfundi_Controller.getfundin);
router.post('/edit', addfundi_Controller.postedit)
router.post('/delete/:id', addfundi_Controller.postDeletefun)

module.exports = router 