/**
 * Created by liuyuhang on 2016/3/1.
 */

var permission = {
    checkLogin: function(req, res, next){
        if(!req.session.user){
            req.flash('error','未登录！');
            res.redirect('/login');
        }
        next();
    },
    checkNotLogin: function(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录！');
            res.redirect('back');
        }
        next();
    }
};

module.exports = permission;