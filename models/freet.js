var express = require('express');
var mongoose = require("mongoose");
var User = require("./user");

var FreetSchema = mongoose.Schema({
  author: {
	  type: mongoose.Schema.Types.ObjectId, 
	  ref: 'User', 
	  required: true 
  },
  dateCreated: {
	  type: Date, 
	  default: Date.now
  },
  content: { 
	  type: String, 
	  required: true 
  },
  refreetedBy:[{
	  type: mongoose.Schema.Types.ObjectId, 
	  ref: 'User'
  }] 
});

var Freet = module.exports = mongoose.model("Freet", FreetSchema);

/**
 * Create a freet; must not be empty
 * 
 * @param newFreet {Object} - new Freet object
 * @param callback {function} - callback function
 * @return new freet object
 */
module.exports.createFreet=function(newFreet, callback){
	newFreet.save(callback);	
}

/**
 * Get freet by freet id
 * 
 * @param id {ObjectId} - freet object _id 
 * @param callback {function} - callback function
 * @return freets with specific id
 */
module.exports.getFreetById=function(id,callback){
	var query={_id:id};
	Freet
		.find(query,callback)
		.sort({dateCreated: 'desc' })
		.populate('author');
}

/**
 * Get freets by author 
 * 
 * @param author {Object} - Object Id of specific author
 * @param callback {function} - callback function
 * @return freets collections with specific author id
 */
module.exports.getFreetsByAuthor=function(author,callback){
	var query={author:author};
	Freet
		.find(query,callback)
		.sort({dateCreated: 'desc' })
		.populate('author')
		.populate('refreetedBy');
}

/**
 * Get freets from all users
 * 
 * @param callback {function} - callback function
 * @return all freets collections
 */
module.exports.getAllFreets=function(callback){
	Freet
		.find(callback)
		.sort({dateCreated: 'desc' })
		.populate('author')
		.populate('refreetedBy');
}

/**
 * Get freets of all users following
 * 
 * @param followingList {Array} - list of user ids following
 * @param callback {function} - callback function
 * @return all freets of users following
 */
module.exports.getAllFollowFreets=function(followingList, callback){
	var query={author:{"$in" : followingList}};
	Freet
		.find(query, callback)
		.sort({dateCreated: 'desc'})
		.populate('author')
		.populate('refreetedBy');
}

/**
 * Delete specific freet
 * 
 * @param id {Object} - Object id of the freet
 * @param callback - callback function
 * @return success or error
 */
module.exports.deleteFreet=function(id,callback){
	var query={_id:id};
	Freet.remove(query, callback);
}

/**
 * Add or remove user from refreet array
 * 
 * @param freetId {ObjectId} - freet id
 * @param userId {ObjectId} - author id
 * @param action {String} - add or remove 
 * @param callback {function} - callback function
 * @return success or error
 */
module.exports.updateRefreetedByList = function (freetId, userId, action, callback) {
	var query={_id:freetId};
    Freet.findOne(query, function (err, freet) {
        if (err || freet == null){
        	return callback(err,freet);
        }         	
        var refreetedBy = freet.refreetedBy;
        addOrRemoveFromList(refreetedBy, userId, action);
        freet.save(function (err, freet) {
            return callback(err, freet);
        });
    });
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

