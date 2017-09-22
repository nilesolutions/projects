$(document).ready(function() {
	$('.dot-box').dotdotdot();
	$('ul.tabs').tabs();
	/*$(".pinned-btn").stick_in_parent();*/
	/*$('.twocol .pushpin-col').pushpin({ top: $('.twocol').offset().top });*/
});
$(document).ready(function(){
	if($('.twocol .pushpin-element').size()) {
		$('.twocol .pushpin-element').pushpin({ top: $('.twocol').offset().top });
	}
});