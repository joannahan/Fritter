(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['freets'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<h2 class=\"page-header\">Freets</h2>\n<form method=\"post\" action=\"/freets\" id=freetform data-preaction='getall'>\n	<div class=\"form-group\">\n		<div id=login data-userid="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.id : stack1), depth0))
    + "></div>\n		<div id=loginuser data-user="
    + alias2(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"user","hash":{},"data":data}) : helper)))
    + "></div> \n		<label>Welcome, "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "!</label>\n		<!--<label>Welcome <div id=\"loginname\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>!</label>-->\n	</div>\n	<div class=\"form-group\">\n<!--    <nav>\n          <ul class=\"nav nav-pills pull-right\">\n              <li role=\"presentation\"><a href=\"/fritters/all\">Get All</a></li>\n          </ul>\n        </nav>\n -->       		\n		<label>Search fritters by user name:</label>\n		<input type=\"text\" id=\"searchuser\" class=\"form-control\" placeholder=\"user name\" name=\"searchname\" value=\"\">\n		<br>\n		<input type=\"button\" id=\"search\" value=\"Search\">\n		<input type=\"button\" id=\"getall\" value=\"Get All\">	\n		<input type=\"button\" id=\"follow\" value=\"Follow\">	\n		<input type=\"button\" id=\"unfollow\" value=\"Unfllow\">\n		<input type=\"button\" id=\"getallfollow\" value=\"Get All Follow\">		\n	</div>\n	<div class=\"form-group\">\n		<label>Post a fritter:</label>\n	    <textarea id=\"newfreet\" class=\"form-control\"  name=\"content\" placeholder=\"Enter a freet...\" value=\"\"> </textarea>\n	  	<br>\n	  	<input type=\"button\" id=\"post\" value=\"Post\">\n	</div>\n	<div class=\"form-group\">\n		<label>Fritter board:</label>\n		<div id=\"fritterContainer\">\n    		<div id='fritterlist'></div>	   \n			<br>\n	    </div>\n        <table id=\"freets-table\" class=\"table table-striped\">\n 	     <tr>\n            <td><b></b></td>\n            <td><b></b></td>\n            <td><b></b></td>\n          </tr>\n        </table>\n	</div>\n</form>";
},"useData":true});
templates['freet_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		  	<li class='refreetby' data-refreet-id="
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<tr id=1_"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " class='freet-detail' data-author="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.dateCreated || (depth0 != null ? depth0.dateCreated : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateCreated","hash":{},"data":data}) : helper)))
    + "</td>\n  <td> </td>\n  <td></td>\n</tr>	    \n<tr id=2_"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-freet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-author="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1._id : stack1), depth0))
    + " class='freet-detail'>\n  <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n  <td><input type='button' class='remove' data-freet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-author="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1._id : stack1), depth0))
    + " value='Delete'></td>\n  <td><input type='button' id=refreet_button_"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " class='refreet' data-freet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-author="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1._id : stack1), depth0))
    + " value='Refreet'></td>\n  <td>\n	  <ul data-freet-id="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.parent : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.refreetedBy : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	  </ul>\n  </td>\n</tr>\n";
},"useData":true});
templates['freet_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet_item,depth0,{"name":"freet_item","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <h2 class=\"page-header\">Fritter</h2>\r\n<p>Welcome to Fritter</p>  ";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2 class=\"page-header\">Account Login</h2>\r\n<form method=\"post\" action=\"/users/login\">\r\n	<div class=\"form-group\">\r\n		<label>Username</label>\r\n		<input type=\"text\" class=\"form-control\" name=\"username\" placeholder=\"Username\">\r\n	</div>\r\n	<div class=\"form-group\">\r\n		<label>Password</label>\r\n		<input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\">\r\n	</div>\r\n	<button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n</form>";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<div class=\"alert alert-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.msg || (depth0 != null ? depth0.msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"msg","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2 class=\"page-header\">Register</h2>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.errors : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<form method=\"post\" action=\"/users/register\">\n	<div class=\"form-group\">\n		<label>Name</label>\n		<input type=\"text\" class=\"form-control\" placeholder=\"Name\" name=\"name\">\n	</div>\n	<div class=\"form-group\">\n		<label>Username</label>\n		<input type=\"text\" class=\"form-control\" placeholder=\"Username\" name=\"username\">\n	</div>\n	<div class=\"form-group\">\n		<label>Email</label>\n		<input type=\"email\" class=\"form-control\" placeholder=\"Email\" name=\"email\">\n	</div>\n	<div class=\"form-group\">\n		<label>Password</label>\n		<input type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\">\n	</div>\n	<div class=\"form-group\">\n    	<label>Confirm Password</label>\n		<input type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password2\">\n	</div>	\n	<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n</form>";
},"useData":true});
templates['layouts/layout'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "							<li role=\"presentation\"><a href=\"/freets\">Fritter</a></li>						\n							<li role=\"presentation\"><a href=\"/users/logout\">Logout</a></li>					\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "							<li role=\"presentation\"><a href=\"/users/login\">Login</a></li>\n							<li role=\"presentation\"><a href=\"/users/register\">Register</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<div class=\"alert alert-success\">"
    + container.escapeExpression(((helper = (helper = helpers.success_msg || (depth0 != null ? depth0.success_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"success_msg","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<div class=\"alert alert-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.error_msg || (depth0 != null ? depth0.error_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error_msg","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<div class=\"alert alert-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<!DOCTYPE html>\n<html>\n	<head>\n		<title>Fritter Applications</title>\n		<link href=\"/css/bootstrap.css\" rel=\"stylesheet\" type=\"text/css\" />\n		<link href=\"/css/style.css\" rel=\"stylesheet\" type=\"text/css\" />\n        <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script>\n		<script type=\"text/javascript\" src=\"/js/index.js\"></script>		\n	    <!-- Handlebars Runtime -->\n	    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.runtime.min.js\"></script>        \n	    <!-- Handlebars templates -->\n	    <script src=\"/js/templates.js\"></script>	    \n	</head>\n	<body>	\n		<div class=\"container\">\n			<div class=\"header clearfix\">\n				<nav>\n					<ul class=\"nav nav-pills pull-right\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "					</ul>	\n				</nav>\n				<h3 class=\"text-muted\">Fritter App</h3>	\n			</div>\n			\n			<div class=\"row\">\n				<div class=\"col-lg-12\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.success_msg : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error_msg : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          			"
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n				</div>\n			</div>\n\n			<footer class=\"footer\">\n				<p>&copy; 2016 Fritter App, Inc.</p>\n			</footer>\n		</div><!--/container -->\n	</body>\n</html>	";
},"useData":true});
})();
