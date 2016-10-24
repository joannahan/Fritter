var express = require('express');
var router = express.Router();
var Freet = require('../models/freet');
var User = require('../models/user');

//Get all freets
router.get('/', function(req,res){
	res.render('freets');
});
//Create freets
router.post('/', function(req,res){
	res.render('freets');
});

//Search freets by name
router.get('/search/:name', function(req, res, next) {
	var name=req.params.name;
	User.getUserByName(name, function(err, user) {
		if (err) {
			return done(res, err, false, null);
		}
  		if(!user){
  			return done(res, null, false, 'invalid search user name:'+name);
 		}				
		Freet.getFreetsByAuthor(user._id, function(err, freets){
			if (err) {
				return done(res, err, false, null);				
			}				
			if(!freets || freets.length===0){
				return done(res, null, false, 'there is no freet.');
			}
	  		res.json({
				success: true, 
				freets: freets,
				loginuser:req.user
			});				
    	});			
	});
});

//get all freets
router.get('/getall', function(req, res, next) {
	Freet.getAllFreets(function(err, freets){
		if (err) {
			return done(res, err, false, null);				
		}				
		if(!freets || freets.length===0){
			return done(res, null, true, 'there is no freet.');
		}
  		res.json({
			success: true, 
			freets: freets
		});				
	});			
});

//get all following freets
router.get('/getallfollow', function(req, res, next) {
	Freet.getAllFollowFreets(req.user.following, function(err, freets){
		if (err) {
			console.log('err:'+err);
			return done(res, err, false, null);				
		}				
		if(!freets || freets.length===0){
			console.log('there is no freet');
			return done(res, null, false, 'there is no freet.');
		}
  		res.json({
			success: true, 
			freets: freets
		});				
	});			
});
//update refreet list of incoming freet based on whether refreeted or not
router.put('/:id', function(req, res, next) {
	// if already refreeted, but want to unrefreet
	Freet.getFreetById(req.params.id, function(err,data){
		if (err){
			return done(res, err, false, null);
		}
		var freet = data[0];
		var isRefreetedBy=(freet.refreetedBy.indexOf(req.user._id)>-1);
		var action=req.body.action;
		if (!isRefreetedBy && action=='add') {
			Freet.updateRefreetedByList(freet._id,req.user._id, action, function(err, freet){
				if (err) {
					return done(res, err, false, null);				
				}
				User.getUserById(freet.author,function(err, user){
					if (err)
						return done(res,err,false,null);
					else{
						var newfreet=new Freet({
							author:req.user._id,
							content:'(' + req.user.name + '\n refreeted from \n' + user.name + ')\n '+ freet.content,
						});
						Freet.createFreet(newfreet, function(err, freet) {
							if (err) {
								return done(res, err, false, null);
							}
							if(!freet || freet.length===0){
								return done(res, null, true, 'failed to save freet with unknown issue.');
							}
							User.getUserById(freet.author, function(err, user){
								if (err) {
									return done(res, err, false, null);
								}
								freet.author=user;
					  			res.json({
									success: true,
									freet: freet
								});				
					    	});			
						});
					}
				})
			});					
		}else{
			return done(res, null, true, 'there is no required acton:'+action +' a freet (add=refreet, remove=unrefreet).');
		}		
	});
});

//create new freet
router.post('/post', function(req, res, next) {
	var author=req.body.name;
	var content=req.body.email;
	//Validation
	req.checkBody('author','Name is required').notEmpty();
	req.checkBody('content','Name is required').notEmpty();
	var newfreet=new Freet({
		author:req.body.author,
		content:req.body.content
	});
	Freet.createFreet(newfreet, function(err, freet) {
		if (err) {
			return done(res, err, false, null);
		}
		if(!freet || freet.length===0){
			return done(res, null, true, 'failed to save freet with unknown issue.');
		}
		User.getUserById(freet.author, function(err, user){
			if (err) {
				return done(res, err, false, null);
			}
			freet.author=user;
  			res.json({
				success: true,
				freet: freet
			});				
    	});			
	});
});

//delete freet
router.delete('/:id', function(req, res, next) {
	var id=req.params.id;
	Freet.deleteFreet(id, function(err){
		if (err) {
			return done(res, err, false, null);				
		}				
  		res.json({
			success: true 
		});				
	});			
});

//common helper function for callback
var done=function(res, err, success, customMessage){
	if (err) {
		console.log(err);
			res.json({
			success: false, 
			message: err.message
		});
	}else if (err===null && success===false){
		console.log(customMessage);
		res.json({
			success: false, 
			message: customMessage	
		});	
	}else{
		res.json({
			success: true, 
			message: customMessage	
		});			
	}
	return done;
}
module.exports = router;