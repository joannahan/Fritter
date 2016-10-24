var assert = require("assert");
var mongoose = require("mongoose");
var User = require("../models/user");
var Freet = require("../models/freet");

// Testing Fritter 
describe('Fritter App', function() {
	// The mongoose connection object.
	var con;

	// Before running any test, connect to the database.
	before(function(done) {
		con = mongoose.connect("mongodb://localhost/frittertest", function() {
			done();
		});
	});
	// Delete the database before each test.
	// Keep this commented out for tests 
//	beforeEach(function(done) {
//		con.connection.db.dropDatabase(function() { done(); });
//	});	
	
	var newFreet1 = new Freet({content: "hello lol"});
	var newFreet2 = new Freet({content: ""});
	var newFreet3 = new Freet({content: "pizza"});

	var newUser = new User({username: "a", password: "a", email: "a@gmail.com", name: "Adam Brown"});
	var newUser2 = new User({username: "b", password: "b", email: "b@gmail.com", name: "Ben Smith"});
	var newUser3 = new User({username: "c", password: "c", email: "c@gmail.com", name: "Chris Cullen", following: []});

	// Testing User Model
	describe ('User', function() {
		it('testing createUser', function(done) {
			User.createUser(newUser, function(err, doc) {
				assert.strictEqual(doc.username, "a");
				assert.strictEqual(doc.email, "a@gmail.com");
				if (err) {
					console.log("error");
				}
				done();
			});
		}); 
		
		it('testing getUserByName', function() {
			User.getUserByName("Adam Brown", function(err, doc) {
				assert.strictEqual(doc.username, "a");
				assert.strictEqual(doc.email, "a@gmail.com");
			});
			User.getUserByName("Ben Smith", function(err, doc) {
				assert.strictEqual(doc.username, "b");
				assert.strictEqual(doc.email, "b@gmail.com");
			});
		});
		
		var userId;
		var userId2;
		var followingId;
		var followingId2;
		it('testing getUserByUsername', function() {
			User.getUserByUsername("a", function(err, doc) {
				assert.strictEqual(doc.email, "a@gmail.com");
				assert.strictEqual(doc.name, "Adam Brown");
				userId=doc._id;
				followingId=doc.following[0]._id;
			});
			User.getUserByUsername("b", function(err, doc) {
				assert.strictEqual(doc.email, "b@gmail.com");
				assert.strictEqual(doc.name, "Ben Smith");
				userId2=doc._id;
				followingId2=doc.following[0]._id;
			});
		});
		
		it('testing getUserById', function() {
			User.getUserById(newUser, function(err, doc) {
				assert.strictEqual(userId, mongoose.Schema.Types.ObjectId);
			});
		});
		
		it ('testing updateFollowing', function() {
			User.updateFollowing(userId, followingId, function(err,doc) {
				assert(!err);
			});
		});
		
		it ('testing updateFollowList', function() {
			User.updateFollowList(userId, followingId, "add", function(err,doc) {
				assert(!err);
			});
			User.updateFollowList(userId, followingId, "remove", function(err,doc) {
				assert(!err);
			});
		});

	}); //end describe user
	
	
	//Testing Freet Model
	describe('Freet', function() {
		var authorId;
		it('testing createFreet', function() {
			Freet.createFreet(newFreet1, function(err, doc) {
				assert.strictEqual(doc.content, "hello lol");
				authorId=doc._id;
			});
		});

		it ('create an empty freet ', function() {
			Freet.createFreet(newFreet2, function() {
				assert(err);
			});
		});
		
		it ('testing getFreetsByAuthor', function() {
			Freet.getFreetsByAuthor(newFreet1, function() {
				assert.strictEqual(authorId, mongoose.Schema.Types.ObjectId);
			});
		});
		
		it ('testing getAllFreets', function() {
			Freet.getAllFreets(function(err, doc) {
				assert(!err);
			});
		});
		
		it ('testing deleteFreet', function() {
			Freet.deleteFreet(newFreet1, function() {
				assert.strictEqual(doc.content, err);
			});
		});
		
		it ('testing getAllFollowFreets', function() {
			following_freets = [Freet.author_id];
			Freet.getAllFollowFreets(following_freets, function(err, doc) {
				assert.strictEqual(doc, following_freets);
			});
		});
		
		it ('testing updateRefreetedByList', function() {
			Freet.updateRefreetedByList(Freet.author_id, authorId, "add", function(err, doc) {
				assert(!err);
			});
			Freet.updateRefreetedByList(Freet.author_id, authorId, "remove", function(err, doc) {
				assert(!err);
			});
		});
		
	}); //end describe freet  

});

