var express = require('express');
var router = express.Router();
var permission = require('./permission.js');

router.get('/', permission.checkLogin);
router.get('/',function(req,res){
    req.session.user = null;
    req.flash('success','登出成功！');
    res.redirect('/');
});

module.exports = router;