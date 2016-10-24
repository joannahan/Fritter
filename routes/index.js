var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

/**
 * Ensure user is logged in
 * @param req - request
 * @param res - response
 * @param next - next function
 * @return success or redirect to /users/login
 */
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;
