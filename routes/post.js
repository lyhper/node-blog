var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('post',{title:'发表'});
});
router.post('/',function(req,res,next){
});

module.exports = router;