const express =  require('express');
const query8Controller = require('../controllers/query8');

const router = express.Router();
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', query8Controller.getMain);
module.exports = router ;