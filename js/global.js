$(document).ready(function(){
	var linkOffset = 50; //The offset from the top of the page (used for fixed header)
	
	//Speed of the scroll
	$.waypoints.settings.scrollThrottle = 30;

	// Register each section as a waypoint.
	$('.waypoint').waypoint(function(direction){	
		 if (direction === 'down') {
			 currentMenu(this);		
		 }
	}, {offset: '50%'})
	.waypoint(function(direction) {
	    if (direction === 'up') {
	    	currentMenu(this);	
	    }
	}, {offset: '-50%'}); //Used for offset bug on the way up
	
	function currentMenu(obj){
		var $active = $(obj);	
	
		//Make menu link active
		$('.active').removeClass('active');	
		$('#menu ul li a[href=#'+$active.attr('id')+']').addClass('active');
	}

	// Smooth scrolling for internal links
	$("a[href^='#']").click(function(event) {
		event.preventDefault();		
		$target = $(this.hash);	
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top-linkOffset
		}, 1000, 'swing', function() {
			//window.location.hash = target; //show the updated url address
		});	
	});
	
	
	//Handle Mentor post
	$("#contact-form").submit(function(){					
		var formData = $(this).serialize(); //Get all form fields	
		var $submit = $('input[type=submit]');

		var request = $.ajax({
			 url: "contact.php",
			 type: "POST",
			 data: formData,
			 dataType: "html"
		});
		
		request.done(function(msg) {
			var $formError = $('#form-error');
			if(msg === 'success'){
				$('#mentor-submit').show();
				$formError.hide();
				$('form').find("input[type=text], textarea").val("");
			}else{
				$formError.empty();
				$formError.append(msg);
				$formError.show();
			}
		});
		
		request.fail(function(jqXHR, textStatus) {
			 alert( "Request failed: " + textStatus );
		});
		
		return false; //Cancel submit button behavior
    });
	
	
	//Mentor submit modal, hide when clicked on
	$('#mentor-submit').on('click',function(){
		$(this).hide();
	})
});