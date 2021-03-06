/**
 * Created by liuyuhang on 2016/2/28.
 */
var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback){
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insertOne(user,{
                safe: true
            },function(err, result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result.ops[0]);
            });
        });
    });
};

User.get = function(name,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({
                name: name
            }).limit(1).next(function(err, user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            });
        });
    });
};