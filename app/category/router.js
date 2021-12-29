var express = require('express');
var router = express.Router();
const {index,viewCreate, actionCreate, viewEdit, ActionEdit,ActionDelete} = require('./controller')

/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/',index);
router.get('/create',viewCreate);
router.post('/create',actionCreate);
router.get('/edit/:id',viewEdit);
router.put('/edit/:id',ActionEdit);
router.delete('/delete/:id',ActionDelete);

module.exports = router;