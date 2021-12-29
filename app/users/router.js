var express = require('express');
var router = express.Router();
const {viewSignin,actionSignin,logOut,viewListUser,viewCreate,actionCreate} = require('./controller')

/* GET home page. */   
router.get('/',viewSignin);
router.post('/',actionSignin);
router.get('/logout',logOut);
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/listUser',viewListUser);
router.get('/create',viewCreate);
router.post('/create',actionCreate);

module.exports = router;