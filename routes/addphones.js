const express =  require('express')
const addphones_Controller = require('../controllers/addphones')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addphones_Controller.getMain)
router.post('/add', addphones_Controller.postadd)
router.post('/edit',addphones_Controller.postedit)

router.post('/delete/:id/:phone',addphones_Controller.postDelete)
module.exports = router 