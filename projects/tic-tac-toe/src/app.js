  //instead of X and O, we'll play with red and blue
  $(document).ready(function() {

    var userPosition = [],
      userColor,
      compColor,
      userTurn = false;

    //user chooses red
    $('#red').click(function() {
      userColor = 'red';
      compColor = 'blue';
      $('#choose').addClass("hidden");
      $('#comp-turn').removeClass("hidden");
      $('h1').css("color", "transparent");
      compPlay('#c3');
    });

    //user chooses blue
    $('#blue').click(function() {
      userColor = 'blue';
      compColor = 'red';
      $('#choose').addClass("hidden");
      $('#comp-turn').removeClass("hidden");
      $('h1').css("color", "transparent");
      compPlay('#c3');
    });

    //computer's turn
    var compPlay = function(sq) {
      $('#comp-turn').addClass("hidden");
      $('#user-turn').removeClass("hidden");
      $(sq).css('pointer-events', 'none');
      $(sq).css('background', compColor);
      userTurn = true;
    };

    //user's turn
    var userPlay = function(sq) {
      $('#user-turn').addClass("hidden");
      $('#comp-turn').removeClass("hidden");
      $(sq).css('pointer-events', 'none');
      $(sq).css('background', userColor);
      userPosition.push(sq.attr('id'));
      userTurn = false;
    };

    //lose message
    var loseMsg = function(sq1, sq2, sq3) {
      setTimeout(function() {
        userTurn = false;
        $('#user-turn').addClass("hidden");
        $(sq1).css('background', 'white');
        $(sq2).css('background', 'white');
        $(sq3).css('background', 'white');
        $('#lose').removeClass("hidden");
      }, 2000);
    };

    //draw/tie message
    var drawMsg = function() {
      setTimeout(function() {
        $('#user-turn').addClass("hidden");
        $('#draw').removeClass("hidden");
      }, 2000);
    };

    //play again!
    $('.again').click(function() {
      userTurn = false;
      userPosition = [];
      $('canvas').removeClass("highlight");
      $('canvas').attr('style', '');
      $('#menu').children('p').addClass("hidden");
      $('#choose').removeClass('hidden');
    });

    //timeout function for each play
    function playSq(sq) {
      setTimeout(function() {
        compPlay('#c' + sq);
      }, 2000);
    }

    //play sequence hardcoded and user cannot win
    $('canvas').click(function() {
      if (userTurn && userPosition.length === 0) {
        userPlay($(this));
        if (userPosition[0] == 'c1' || userPosition[0] == 'c2' ||
          userPosition[0] == 'c4' || userPosition[0] == 'c7' || userPosition[0] == 'c8') {
          playSq(9);
        } else if (userPosition[0] == 'c5' || userPosition[0] == 'c9') {
          playSq(7);
        } else if (userPosition[0] == 'c6') {
          playSq(5);
        }
      }
    });

    $('canvas').click(function() {
      if (userTurn && userPosition.length == 1) {
        userPlay($(this));
        if (userPosition[0] == 'c1' || userPosition[0] == 'c2') {
          if (userPosition[1] == 'c6') {
            playSq(7);
          } else if (userPosition[1] != 'c6') {
            playSq(6);
            loseMsg('#c3', '#c6', '#c9');
          }
        } else if (userPosition[0] == 'c4') {
          if (userPosition[1] == 'c6') {
            playSq(5);
          } else {
            playSq(6);
            loseMsg('#c3', '#c6', '#c9');
          }
        } else if (userPosition[0] == 'c6') {
          if (userPosition[1] == 'c7') {
            playSq(2);
          } else if (userPosition[1] != 'c7') {
            playSq(7);
            loseMsg('#c3', '#c5', '#c7');
          }
        } else if (userPosition[0] == 'c7' || userPosition[0] == 'c8') {
          if (userPosition[1] == 'c6') {
            playSq(1);
          } else {
            playSq(6);
            loseMsg('#c3', '#c6', '#c9');
          }
        } else if (userPosition[0] == 'c9') {
          if (userPosition[1] == 'c5') {
            playSq(1);
          } else {
            playSq(5);
            loseMsg('#c3', '#c5', '#c7');
          }
        } else if (userPosition[0] == 'c5') {
          if (userPosition[1] == 'c1') {
            playSq(9);
          } else if (userPosition[1] == 'c9') {
            playSq(1);
          } else if (userPosition[1] == 'c2') {
            playSq(8);
          } else if (userPosition[1] == 'c8') {
            playSq(2);
          } else if (userPosition[1] == 'c4') {
            playSq(6);
          } else if (userPosition[1] == 'c6') {
            playSq(4);
          }
        }
      }
    });

    $('canvas').click(function() {
      if (userTurn && userPosition.length == 2) {
        userPlay($(this));
        if (userPosition[0] == 'c1' && userPosition[1] == 'c6' || userPosition[0] == 'c2' && userPosition[1] == 'c6') {
          if (userPosition[2] == 'c8') {
            playSq(5);
            loseMsg('#c3', '#c5', '#c7');
          } else {
            playSq(8);
            loseMsg('#c7', '#c8', '#c9');
          }
        } else if (userPosition[0] == 'c4' && userPosition[1] == 'c6') {
          if (userPosition[2] == 'c1') {
            playSq(7);
            loseMsg('#c3', '#c5', '#c7');
          } else {
            playSq(1);
            loseMsg('#c1', '#c5', '#c9');
          }
        } else if (userPosition[0] == 'c6' && userPosition[1] == 'c7') {
          if (userPosition[2] == 'c8' || userPosition[2] == 'c9' || userPosition[2] == 'c4') {
            playSq(1);
            loseMsg('#c1', '#c2', '#c3');
          } else if (userPosition[2] == 'c1') {
            playSq(8);
            loseMsg('#c8', '#c5', '#c2');
          }
        } else if (userPosition[0] == 'c7' && userPosition[1] == 'c6' || userPosition[0] == 'c8' && userPosition[1] == 'c6') {
          if (userPosition[2] == 'c5') {
            playSq(2);
            loseMsg('#c1', '#c2', '#c3');
          } else {
            playSq(5);
            loseMsg('#c1', '#c5', '#c9');
          }
        } else if (userPosition[0] == 'c9' && userPosition[1] == 'c5') {
          if (userPosition[2] == 'c2') {
            playSq(4);
            loseMsg('#c1', '#c4', '#c7');
          } else {
            playSq(2);
            loseMsg('#c1', '#c2', '#c3');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c1') {
          if (userPosition[2] == 'c6') {
            playSq(8);
            loseMsg('#c7', '#c8', '#c9');
          } else {
            playSq(6);
            loseMsg('#c3', '#c6', '#c9');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c2') {
          if (userPosition[2] == 'c9') {
            playSq(1);
          } else {
            playSq(9);
            loseMsg('#c7', '#c8', '#c9');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c4') {
          if (userPosition[2] == 'c9') {
            playSq(1);
          } else {
            playSq(9);
            loseMsg('#c3', '#c6', '#c9');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c6') {
          if (userPosition[2] == 'c1') {
            playSq(9);
          } else {
            playSq(1);
            loseMsg('#c1', '#c4', '#c7');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c8') {
          if (userPosition[2] == 'c1') {
            playSq(9);
          } else {
            playSq(1);
            loseMsg('#c1', '#c2', '#c3');
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c9') {
          if (userPosition[2] == 'c2') {
            playSq(4);
            loseMsg('#c1', '#c4', '#c7');
          } else {
            playSq(2);
            loseMsg('#c1', '#c2', '#c3');
          }
        }
      }
    });

    $('canvas').click(function() {
      if (userTurn && userPosition.length == 3) {
        userPlay($(this));
        if (userPosition[0] == 'c5' && userPosition[1] == 'c2' && userPosition[2] == 'c9') {
          if (userPosition[3] == 'c6') {
            playSq(4);
            loseMsg('#c1', '#c4', '#c8');
          } else if (userPosition[3] == 'c4') {
            playSq(6);
            drawMsg();
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c4' && userPosition[2] == 'c9') {
          if (userPosition[3] == 'c8') {
            playSq(2);
            loseMsg('#c1', '#c2', '#c3');
          } else if (userPosition[3] == 'c2') {
            playSq(8);
            drawMsg();
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c6' && userPosition[2] == 'c1') {
          if (userPosition[3] == 'c2') {
            playSq(8);
            loseMsg('#c7', '#c8', '#c9');
          } else if (userPosition[3] == 'c8') {
            playSq(2);
            drawMsg();
          }
        } else if (userPosition[0] == 'c5' && userPosition[1] == 'c8' && userPosition[2] == 'c1') {
          if (userPosition[3] == 'c4') {
            playSq(6);
            loseMsg('#c3', '#c6', '#c9');
          } else if (userPosition[3] == 'c6') {
            playSq(4);
            drawMsg();
          }
        }
      }
    });
  });