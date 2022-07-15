const express =  require('express')
const addResCent_Controller = require('../controllers/addResearchCent')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addResCent_Controller.getMain)
router.post('/add',addResCent_Controller.postadd)
router.post('/edit',addResCent_Controller.postedit)
router.post('/delete/:id',addResCent_Controller.postDelete)
module.exports = router 