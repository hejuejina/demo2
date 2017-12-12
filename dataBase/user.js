var mongoose = require('../mongoose').mongoose;

// var Schema = mongoose.Schema;

// var userSchema = new Schema({
//     username:  String,
//     userPass: String,
//     email:   String
// });


var userSchema = new mongoose.Schema({
	username: String,
	userpass: String,
	email: String
});

userSchema.statics.getUserBySignupInfo = function(username, email, callback){
	var cond = ['$or', {username: username}, {email: email}];
	 this.find(cond, callback);
};

userSchema.statics.addUser = function(user, callback){
	 this.create(user, callback);
};

userSchema.statics.getUser = function(username, userpass, callback){
	this.findOne({username: username, userpass: userpass}, callback);
};


// userSchema.statics.getUserBySignupInfo = function(username,email,callback){

//     var info = ['$or',{username:username},{email:email}] ;
//     this.find(info,callback);
// }

// userSchema.statics.addUser = function(user, callback){
// 	this.create(user, callback);
// };

// userSchema.statics.getUser = function(username, userpass, callback){
// 	this.findOne({username: username, userpass: userpass}, callback);
// };

module.exports = mongoose.model('User', userSchema);