$(document).ready(function() {

  var countDisplay,
    gameArray,
    userArray,
    speed,
    strictButton = false,
    timeouts = [],
    colors = ['green', 'red', 'yellow', 'blue'];

  //load init  
  init();

  //used on load and reset-button to reset variables
  function init() {
    gameArray = [];
    userArray = [];
    countDisplay = 1;
    speed = 500;
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;
    $('.game-wrapper button').not('#start').attr("disabled", "disabled");
    $('.count').html('');
  }

  $('#start').click(startGame);

  $('#reset').click(function() {
    init();
    startGame();
  });

  //controls strict button
  $('#strict').click(function() {
    if (strictButton === false) {
      $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
      strictButton = true;
    } else {
      $(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
      strictButton = false;
    }
  });

  //generate random number/color
  function randomColor() {
    return colors[Math.floor(Math.random() * 4)];
  }

  function startGame() {
    $('#reset').removeAttr("disabled");
    $('#start').attr("disabled", "disabled");
    $('.count').html(countDisplay);
    nextRound();
  }

  //compares user's color and game
  $('.game-wrapper button').not('#reset').on('mouseup', function pressed() {
    if (!gameArray.length) return;
    $('.game-wrapper button').attr("disabled", "disabled");
    var color = $(this).attr("class");
    playSound(color);
    if (color === gameArray[userArray.length]) {
      userArray.push(color);
      success();
    } else {
      userArray = [];
      fail();
    }
  });

  //different sounds for each color
  function playSound(color) {
    if (color === 'green') {
      $('#sound1').get(0).play();
      setTimeout(function() {
        $('#sound1').get(0).play();
      }, speed / 3);
    }
    if (color === 'red') {
      $('#sound2').get(0).play();
      setTimeout(function() {
        $('#sound2').get(0).play();
      }, speed / 3);
    }
    if (color === 'yellow') {
      $('#sound3').get(0).play();
      setTimeout(function() {
        $('#sound3').get(0).play();
      }, speed / 3);
    }
    if (color === 'blue') {
      $('#sound4').get(0).play();
      setTimeout(function() {
        $('#sound4').get(0).play();
      }, speed / 3);
    }
  }

  //delay time and prevent clash
  function delay(a, b) {
    timeouts.push(setTimeout(a, b));
  }

  //decides next step upon user's successful color match and increase speed as user progresses 
  function success() {
    if (userArray.length === gameArray.length) {
      countDisplay++;
      if (countDisplay === 5) {
        speed = 400;
      } else if (countDisplay === 9) {
        speed = 300;
      } else if (countDisplay === 13) {
        speed = 200;
      } else if (countDisplay === 20) {
        $('.count').html('WIN');
        init();
        startGame();
      }
      $('.count').html('YES');
      delay(function() {
        $('.count').html(countDisplay);
      }, speed);
      delay(function() {
        nextRound();
      }, speed * 2);
    } else {
      $('.game-wrapper button').removeAttr("disabled");
    }
  }

  //decides next step upon user's failed color match
  function fail() {
    $('#sound5').get(0).play();
    setTimeout(function() {
      $('#sound5').get(0).play();
    }, speed / 3);
    $('.count').html('NO');
    delay(function() {
      $('.count').html(countDisplay);
    }, speed);
    delay(function() {
      if (strictButton) {
        init();
        startGame();
      } else {
        playSignals();
      }
    }, speed * 2);
  }

  function nextRound() {
    userArray = [];
    gameArray.push(randomColor());
    playSignals();
  }

  //repeat signals
  function playSignals() {
    timeouts.length = 0;
    gameArray.forEach(function(color, index) {
      delay(function() {
        playSound(color);
        $('.' + color).addClass('lighten');
        setTimeout(function() {
          $('.' + color).removeClass("lighten");
        }, speed / 2);
      }, speed * index);
    });
    delay(function() {
      $('.game-wrapper button').not('#start').removeAttr('disabled');
    }, (speed * gameArray.length) - 50);
  }
});