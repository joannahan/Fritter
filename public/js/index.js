$(document).ready(function() { 
	// Allow Handlebars templates and partials
	Handlebars.partials = Handlebars.templates;

	var insertSelector = '#freets-table tr:last';
	var insertSelectorFrist = '#freets-table tr:first';
	var $frettstable=$('#freets-table');
	var $login=$('#login');

	// On document load, fetch all freets and display them.
    $.get('/freets/getall', function(freets) {
	      if (freets.success) {
	    	  	$('.freet-detail').remove();
		        var html = Handlebars.templates.freet_items(freets);
		        $(insertSelector).before(html); 
		        //hide follow activity
			  	$('#follow').hide();
			  	$('#unfollow').hide();

			  	syncbutton($(".remove"), 'author', $login, 'userid', true, false);
			  	updateRefreetButton();
			  	
			  	$('#freetform').data('preaction','getall');

		}

	});
	
	/*
	 * security protection:
	 * if login userid is empty in fritter page, redirect it to login page
	 */
	if ($login && $login.data('userid')===''){
		window.location.href = "/users/login";
	}else{
		//initial, follow and unfollow buttons are hidden
		$('#follow').hide();
		$('#unfollow').hide();
	}

	//follow click handler
	$('#follow').click(function(){
		$.ajax({
			context:this,
			type:'PUT',
			url:'/users/'+$('.freet-detail').data('author'),
			data:{action:'add'},
			success:function(loginuser){						
	   			 //check follow status
	  			 if (loginuser.loginuser._id !==$('.freet-detail').data('author')){
	      			  if (isFollowing(loginuser.loginuser, $('.freet-detail').data('author'))){
	      				  $('#follow').hide();
	      				  $('#unfollow').show();    				      				  
	      			  }else{
	     				  $('#follow').show();
	      				  $('#unfollow').hide();    				      				      				  
	      			  }    				  
	  			  }else{
						  $('#follow').hide();
	  				  $('#unfollow').hide();    	
	  			  }
			},
			error:function(err){
				alert(status.message);
			}
		});
	})
	
	// unfollow click handler
	$('#unfollow').click(function(){
		$.ajax({
			context:this,
			type:'PUT',
			url:'/users/'+$('.freet-detail').data('author'),
			data:{action:'remove'},
			success:function(loginuser){						
	   			 //check follow status				  
	  			  if (loginuser.loginuser._id !==$('.freet-detail').data('author')){//does not check yourself
	      			  if (isFollowing(loginuser.loginuser, $('.freet-detail').data('author'))){
	     				  $('#follow').hide();
	      				  $('#unfollow').hide();    				      				  
	      			  }else{
	     			      $('#follow').show();
	      				  $('#unfollow').hide();    				      				      				  
	      			  }    				  
	  			  }else{
						  $('#follow').hide();
	  				  $('#unfollow').hide();    				      				      				     				  
	  			  }				
			},
			error:function(err){
				alert(status.message);
			}
		});
	})

	//checks if user is following given author id
	var isFollowing = function (user, userIdFollowing) {
	    var index = user.following.indexOf(userIdFollowing);
	    return index > -1;
	}	
	
	//checks if freet is refreeted by logged in user
	var isRefreetedBy = function (freet, userIdFreeting) {
	    var index = freet.refreetedBy.indexOf(userIdFreeting);
	    return index > -1;
	}	
	
	//search users click handler
	$('#search').click(function(){
		var $name=$('#searchuser');
		if ($name.val()===''){
			alert('please enter a name');
			return;
		}
	    $.get('/freets/search/'+$name.val(), function(freets) {
		      if (freets.success) {
		    	  $('.freet-detail').remove();
    			  var html = Handlebars.templates.freet_items(freets,freets.loginuser);	    		  
    			  $(insertSelector).before(html); 
    			  
    			 //check follow status
    			  if (freets.loginuser._id !==$('.freet-detail').data('author')){
        			  if (isFollowing(freets.loginuser, $('.freet-detail').data('author'))){
       					  $('#follow').hide();
        				  $('#unfollow').show();    				      				  
        			  }else{
       					  $('#follow').show();
        				  $('#unfollow').hide();    				      				      				  
        			  }    				  
    			  }else{
  					  $('#follow').hide();
    				  $('#unfollow').hide();    				      				      				     				  
    			  }
    			    //freets with other users don't have delete button
				  	syncbutton($(".remove"), 'author', $login, 'userid', true, false);
				  	//update refreet button on other freets depending on if they have been refreeted or not
				  	updateRefreetButton();
			      	$('#freetform').data('preaction','search');
				}else {						
		        	$('.freet-detail').remove();
					alert(freets.message);
				}
		});
	    
	});	
	//refresh button when condition is equal
	var syncbutton=function($these, ldata, $this, rdata, b1, b2){
	  	$these.each(function( i ) {
	  		if ( $( this ).data(ldata) === $this.data(rdata)){
	  			if (b1)
	  				$( this ).show();
	  			else
	  				$( this ).hide();
	  		}else{
	  			if (b2)
	  				$( this ).show();
	  			else
	  				$( this ).hide();
	  		}
		});
	}
  	//update refreet button on other freets depending on if they have been refreeted or not	
	var updateRefreetButton=function(){		
			//default:all refreet_button on
			$('.refreet').show();
			//hide refreet button if find it is already refreeted
			$(".refreetby").each(function(i) {
		  		if ( $(this).parent().parent().parent().data('author') !== $login.data('userid')
		  			&& $(this).data('refreet-id')=== $login.data('userid')){
		  			$('#refreet_button_'+$(this).parent().parent().parent().data('freet-id')).hide();
		  		}
	    	});
	    	//third step to update other buttons for loginuser's freets and other freets which loginuser does not refreet   
		  	$( ".refreet" ).each(function( i ) {
		  		var freet_id=$(this).data('freet-id');
		  		if ( $( this ).data('author') === $login.attr('data-userid')){
		  			$( this ).hide();
		  		}
			}); 			    	
	}
	//get all freets click handler
	$('#getall').click(function(){
	    $.get('/freets/getall', function(freets) {
		      if (freets.success) {
		    	  	$('.freet-detail').remove();
			        var html = Handlebars.templates.freet_items(freets);
			        $(insertSelector).before(html); 
			        //hide follow activity
  				  	$('#follow').hide();
  				  	$('#unfollow').hide();

				  	syncbutton($(".remove"), 'author', $login, 'userid', true, false);
				  	updateRefreetButton();
				  	$('#freetform').data('preaction','getall');
			}

		});
	});	
	
	// get all following user freets click handler
	$('#getallfollow').click(function(){
	    $.get('/freets/getallfollow', function(freets) {
		      if (freets.success) {
		    	  	$('.freet-detail').remove();
			        var html = Handlebars.templates.freet_items(freets);
			        $(insertSelector).before(html); 
  				  	$('#follow').hide();
  				  	if ( $('.freet-detail').data('author') === undefined){//no return row
  				  		$('#unfollow').hide();
  				  	}else
  				  		$('#unfollow').show();
				  	syncbutton($(".remove"), 'author', $login, 'userid', true, false);
				  	updateRefreetButton();
				    $('#freetform').data('preaction','getallfollow');
		      }else {
		        	$('#follow').hide();
		        	$('#unfollow').hide();
		        	$('.freet-detail').remove();
					alert(freets.message);
				}

		});
	});	

	//Post a new freet click handler
	$('#post').click(function(){
		var $login=$('#login');
		var $content=$('#newfreet');
		if (jQuery.trim($content.val())===''){
			alert("Please enter message...");
			return;
		}
			
		var freet={
			author:$login.attr('data-userid'),
			content:$content.val(),
		};
		var $fritterlist=$('#fritterlist');
	    $.post('/freets/post', freet, function(postFreet) {
	      if (postFreet.success) {;
	        var html = Handlebars.templates.freet_item(postFreet.freet);
	        $(insertSelectorFrist).before(html);
	        $content.val('');
	        updateRefreetButton();
	      } else {
	    	  alert(postFreet.message);
	      }
	    });		
	});  
	
	//delete a freet click handler
	$frettstable.delegate('.remove','click', function(){
		var id = $(this).data('freet-id');
		var $tr1=$('#1_'+id);
		var $tr2=$('#2_'+id);
		
		$.ajax({
			context:this,
			type:'DELETE',
			url:'/freets/'+$(this).data('freet-id'),
			success:function(){						
				$tr1.fadeOut(300, function(){
	    			$tr1.remove();		    		    
				});
				$tr2.fadeOut(300, function(){
	    			$tr2.remove();		    		    
				});
			},
			error:function(){
				alert(status.message);
			}
			
		});
	 });
	// refreet click handler
	$frettstable.delegate('.refreet','click', function(){
		var id = $(this).data('freet-id');
		var $this=$(this);
		$.ajax({
			context:this,
			type:'PUT',
			url:'/freets/'+$(this).data('freet-id'),
			data:{
				action:'add',//=refreet
			},
			success:function(freet){
				$('#refreet_button_'+id).hide();//it is not allowed to create again
	   			 //check refreet status
				 if (freet.freet===undefined){//it was created and stored in DB
					 alert(freet.message);
				 } 
			     var html = Handlebars.templates.freet_item(freet.freet);
			     $(insertSelectorFrist).before(html);			     
			     updateRefreetButton();
			     $this.hide();
			     //sync refreet line for refreet button and user list
			     updateView();
			     			},
			error:function(err){
				alert(status.message);
			}
		});
	});
	//update all fritter lists
	var updateView=function(){
	     if ($('#freetform').data('preaction')==='getall'){$('#getall').trigger( 'click');}
	};
	
	// unrefreet from the current user
	$frettstable.delegate('.unrefreet','click', function(){
		var id = $(this).data('freet-id');
		refreetOrUnrefreet($(this),'remove');
	});
	//refreet or unrefreet handler
	var refreetOrUnrefreet=function($this, action){
		$.ajax({
			context:this,
			type:'PUT',
			url:'/freets/'+$this.data('freet-id'),
			data:{
				action:action,//add=refreet;remove=unrefreet
			},
			success:function(freet){						
	   			 //check refreet status
				 if (freet.freet===undefined){ //no freet, it will return a meaningful message
					 $('unrefreet_button_'+id).hide();
					 alert(freet.message);
				 }
	  			  if (isRefreetedBy(freet.freet, loginuser.loginuser)){
					 $('#refreet_button_'+id).hide(); 
					 $('#unrefreet_button_'+id).show();  				      				  
	  			  }else{
					 $('#refreet_button_'+id).show(); 
					 $('#unrefreet_button_'+id).hide();
	  			  }
	  			  alert('Please reload to refresh refreet!');
			},
			error:function(err){
				alert(status.message);
			}
		});
	}
	/*
	 * Custom Handlebars Function Helpers 
	 *
	 */
	Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
	    if (arguments.length < 3)
	        throw new Error("Handlebars Helper equal needs 2 parameters");
	    if( lvalue!=rvalue ) {
	        return options.inverse(this);
	    } else {
	        return options.fn(this);
	    }
	});
	
	Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {	
	    if (arguments.length < 3)
	        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
	
	    var operator = options.hash.operator || "==";
	
	    var operators = {
	        '==':       function(l,r) { return l == r; },
	        '===':      function(l,r) { return l === r; },
	        '!=':       function(l,r) { return l != r; },
	        '<':        function(l,r) { return l < r; },
	        '>':        function(l,r) { return l > r; },
	        '<=':       function(l,r) { return l <= r; },
	        '>=':       function(l,r) { return l >= r; },
	        'typeof':   function(l,r) { return typeof l == r; }
	    }
	
	    if (!operators[operator])
	        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
	
	    var result = operators[operator](lvalue,rvalue);
	
	    if( result ) {
	        return options.fn(this);
	    } else {
	        return options.inverse(this);
	    }
	
	});	
});