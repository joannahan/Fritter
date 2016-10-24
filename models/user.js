var mongoose = require("mongoose");
var Freet = require("./freet.js");
var bcrypt=require('bcryptjs');

var UserSchema = mongoose.Schema({
  username: {
	  type:String,
	  index:true,
	  required:true
  },
  password:{
	  type:String,
	  required:true
  },
  email:{
	  type:String
  },
  name:{
	  type:String
  },
  following:[{
	  type: mongoose.Schema.Types.ObjectId, 
	  ref: 'User'
  }], 
});

var User= module.exports = mongoose.model("User", UserSchema);

/**
 * Create a user object
 * 
 * @param newUser {Object} - new User object
 * @param callback {function} - callback function
 * @return new user
 */
module.exports.createUser=function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password=hash;
	        newUser.save(callback);
	    });
	});	
}

/**
 * Get user by user's name
 * 
 * @param name {String} - name of the user
 * @param callback {function} - callback function
 * @return user object with specific name
 */
module.exports.getUserByName=function(name,callback){
	var query={name:name};
	User
		.findOne(query,callback)
		.populate('following');
}



/**
 * Get user by username
 * 
 * @param username {String} - username of the user
 * @param callback {function} - callback function
 * @return user object with specific username
 */
module.exports.getUserByUsername=function(username,callback){
	var query={username:username};
	User.findOne(query,callback);	
}

/**
 * Get user by id
 * 
 * @param id {Object} - id of the user
 * @param callback {function} - callback function
 * @return user object with specific user id
 */
module.exports.getUserById=function(id,callback){
	User.findById(id,callback);
}

/**
 * Compare user password to hashed password
 * 
 * @param candidatePassword {String} - user's password
 * @param hash {String} - hash string
 * @param callback {function} - callback function
 * @return success or error
 */
module.exports.comparePassword=function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){
		if(err) throw err;
		callback(null,isMatch);
	});
}

/**
 * Update following users
 * 
 * @param userid {ObjectId} - id of logged in user
 * @param author {ObjectId} - author id 
 * @param callback {function} - callback function
 * @return success or error
 */
module.exports.updateFollowing=function(userid, author,callback){
	User.findByIdAndUpdate(
		userid,            
		{ "$push": { "following": author } },
		{ "new": true },
		callback);
}


/**
 * Add or remove user from following array
 * 
 * @param userid {ObjectId} - id of logged in user
 * @param author {ObjectId} - author id
 * @param action {String} - add or remove 
 * @param callback {function} - callback function
 * @return success or error
 */
module.exports.updateFollowList = function (userid, author, action, callback) {
	var query={_id:userid};
    User.findOne(query, function (err, user) {
        if (err || user == null) 
        	return callback(err);
        var following = user.following;
        addOrRemoveFromList(following, author, action);
        user.save(function (err, user) {
            return callback(err, user);
        });
    });
}


/**
 * Checks if user is already following a given userId
 * 
 * @param user {Object} - logged in user object
 * @param userIdFollowing {ObjectId} - author id
 * @return true or false
 */
UserSchema.methods.isFollowing = function (user, userIdFollowing) {
    var index = user.following.indexOf(userIdFollowing);
    return index > -1;
}

/**
 * Generic Helper Function
 * Mutates list and adds or removes 1st instance of item in list (if present)
 * 
 * @param list {Array} - list of items
 * @param item {ObjectId} - id
 * @return updated list 
 */
var addOrRemoveFromList = function(list, item, action) {
    // add to list
    if (action==='add') {
        list.push(item);
    } else { 
        // remove from list
    	var index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
    }
    return list;
}
