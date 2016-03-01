var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var permission = require('./permission.js');

router.get('/',permission.checkNotLogin);
router.get('/',function(req,res){
	res.render('register',{
		title:'注册',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/',permission.checkNotLogin);
router.post('/',function(req, res){
	var name = req.body.name;
	var password = req.body.password;
	var passwordRe = req.body['password-repeat'];

	if(password != passwordRe){
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/register');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name: req.body.name,
		password: password,
		email: req.body.email
	});
	User.get(newUser.name,function(err, user){

		if(user){
			req.flash('error','用户已存在！');
			return res.redirect('/register');
		}

		newUser.save(function(err, user){
			if(err){
				req.flash('error',err);
				return res.redirect('/register');
			}
			req.session.user = user;
			req.flash('success','注册成功！');
			res.redirect('/');
		});
	});
});

module.exports = router;