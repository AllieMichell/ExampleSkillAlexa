var express = require('express'); 
var router = express.Router();
const usersController = require('../controllers/userController');

router.get('/userList', usersController.userList);

module.exports = router;