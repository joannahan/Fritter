(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
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
    + "	  </ul>\n  </td>\n</tr>";
},"useData":true});
templates['freet_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet_item,depth0,{"name":"freet_item","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
})();