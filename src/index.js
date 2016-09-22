$(document).ready(function() {

	$(window).on("scroll", function() {
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();
		var checkPosition = false;

		if (scrollPosition >= 1000 && !checkPosition) {
			$("#navbar").css("background", "#222");
			checkPosition = true;
		} else if (scrollPosition < 1000) {
			$("#navbar").css("background-color", "transparent");
			checkPosition = false;
		}
	});



})