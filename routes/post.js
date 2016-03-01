var express = require('express');
var router = express.Router();
var permission = require('./permission.js');

router.get('/', permission.checkLogin);
router.get('/',function(req,res,next){
	console.log('进');
	res.render('post',{title:'发表'});
});
router.post('/', permission.checkLogin);
router.post('/',function(req,res,next){
});

module.exports = router;