var express = require('express');
var router = express.Router();
var permission = require('./permission.js');
var Post = require('../models/post.js');

router.get('/', permission.checkLogin);
router.get('/',function(req,res){
	res.render('post',{
		title:'发表',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/', permission.checkLogin);
router.post('/',function(req,res){
	var user = req.session.user;
	var post = new Post(user.name, req.body.title, req.body.post);
	post.save(function(err){
		if(err){
			req.flash('error',err);
			return res.redirect('back');
		}
		req.flash('success','发布成功！');
		res.redirect('/');
	})
});

module.exports = router;