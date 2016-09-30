$(document).ready(function() {

	$(window).on("scroll", function() {
		var scrollPosition = $(window).height() + $(window).scrollTop();
		var checkPosition = false;

		if (scrollPosition >= 1000 && !checkPosition) {
			$("#navbar").addClass("toggle-nav");
			checkPosition = true;
		} else if (scrollPosition < 1000) {
			$("#navbar").removeClass("toggle-nav");
			checkPosition = false;
		}
	});
	
})