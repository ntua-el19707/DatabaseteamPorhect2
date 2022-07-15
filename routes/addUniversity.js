const express =  require('express')
const addUni_Controller = require('../controllers/addUniversity')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addUni_Controller.getMain)
router.post('/edit',addUni_Controller.postedit)
router.post('/add',addUni_Controller.postadd)
router.post('/delete/:id',addUni_Controller.postDeleteUni)
module.exports = router 