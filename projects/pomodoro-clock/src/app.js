$(document).ready(init);

$('h1').addClass("animated bounce");

var seconds;
var minutes;
var countDown;

//on load
function init() {
  minutes--;
  clearInterval(countDown);
  seconds = 60;
  minutes = 25;
  $('#time').text(minutes);
  $('.setTime').show();
  $('.timer').hide();
  $('.menu').attr("disabled", "disabled").css("opacity", "0.2");
  $('#start').removeAttr("disabled").css("opacity", "1");
}

//start timer
$('#start').click(function() {
  $('.setTime').hide();
  $('.timer').show();
  timer();
  $(this).attr("disabled", "disabled").css("opacity", "0.2");
  $('#stop, #reset').removeAttr("disabled").css("opacity", "1");
  countDown = setInterval(timer, 1000);
  return countDown;
});

$('#resume').click(function() {
  $('#stop').removeAttr("disabled").css("opacity", "1");
  $(this).attr("disabled", "disabled").css("opacity", "0.2");
  timer();
  countDown = setInterval(timer, 1000);
});

$('#stop').click(function() {
  clearInterval(countDown);
  $('#resume, #reset').removeAttr("disabled").css("opacity", "1");
  $(this).attr("disabled", "disabled").css("opacity", "0.2");
});

$('#reset').click(function() {
  init();
});

$('#minusMinute').click(function() {
  minutes--;
  if (minutes < 0) {
    minutes = 0;
  }
  $('#time').text(minutes)
});

$('#plusMinute').click(function() {
  minutes++;
  $('#time').text(minutes);
});

//adjusts timer to look like real time and alarm when time's up then reset
var timer = function() {
  seconds--;

  if (minutes >= 10) {
    $('.minutes').text(minutes + " :")
  } else {
    $('.minutes').text("0" + minutes + " :");
  }

  if (seconds >= 10) {
    $('.seconds').text(seconds)
  } else {
    $('.seconds').text("0" + seconds)
  }

  if (seconds === 0) {
    seconds = 60;
    minutes--;
  }

  if (minutes < 0) {
    $('.alarm').get(0).play();
    init();
  }
}