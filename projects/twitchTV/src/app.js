var usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "medrybw", "trick2g", "arteezy", "C9Sneaky", "wagamamatv", "uknighted"];

$(document).ready(function() {

  usernames.forEach(function(user) {

 $.get("https://api.twitch.tv/kraken/streams/" + user, function(response) {

   // check if users are online
      if (response.stream === null) {
   $.get("https://api.twitch.tv/kraken/channels/" + user, function(channel) {

          if (!channel.logo) {

            $('#offline').append('<div class="list col-xs-6 col-sm-3"><a><em>offline</em></a><br><a href="http://www.twitch.tv/' + user + '" target="_blank" class="thumbnail"><img class="img-circle" src="http://www.banklawyersblog.com/.a/6a00d8341c652b53ef0176177329f9970c-800wi" width="120" height="120"><a href="http://www.twitch.tv/' + user + '" target="_blank"</a><p>' + user + '</p>');
          } else {

            $('#offline').append('<div class="list col-xs-6 col-sm-3"><a><em>offline</em></a><br><a href="http://www.twitch.tv/' + user + '" target="_blank" class="thumbnail"><img class="img-circle" src=' + channel.logo + '  width="120" height="120"><a href="http://www.twitch.tv/' + user + '" target="_blank" </a><p>' + user + '</p>');
          }
        }, "jsonp");

      } else if (!response.stream) {

        $('#closed').append('<div class="list col-xs-6 col-sm-3"><a><em>account closed</em></a><br><img class="img-circle" src="https://pbs.twimg.com/profile_images/2841614423/110404513c0e540edbca999ccc486e18_400x400.jpeg" width="80" height="80"><p>' + user + '</p>')

      } else if (response.stream !== null && !response.stream.channel.logo) {

        $('#online').append('<div class="list col-xs-6 col-sm-3"><a><em>online</em></a><br><a href="http://www.twitch.tv/' + user + '" target="_blank" class="thumbnail"><img class="img-circle" src=https://t2.ftcdn.net/jpg/00/33/52/49/500_F_33524989_ZjnZJa6eQRvLoHl0LP125yU09bJPGT7g.jpg' + ' width="120" height="120"><a href="http://www.twitch.tv/' + user + '" target="_blank" </a><p>' + user + '<span><br> ' + response.stream.game + '</span></p>');

      } else {

        $('#online').append('<div class="list col-xs-6 col-sm-3"><a><em>online</em></a><br><a href="http://www.twitch.tv/' + user + '" target="_blank" class="thumbnail"><img class="img-circle" src=' + response.stream.channel.logo + ' width="120" height="120"><a href="http://www.twitch.tv/' + user + '" target="_blank" </a><p>' + user + '<span><br> ' + response.stream.game + '</span></p></div>');
      }
    }, "jsonp");
  });

  $('#online-button').click(function() {
    $('#online').children().show();
    $('#offline').children().hide();
    $('#closed').children().hide();
  });

  $('#offline-button').click(function() {
    $('#offline').children().show();
    $('#online').children().hide();
    $('#closed').children().hide();
  });

  $('#all-button').click(function() {
    $('#online').children().show();
    $('#offline').children().show();
    $('#closed').children().show();
  });
});

// disables the 'enter' button from refreshing the page when using search box
$(document).keypress(function(e) {
  if (e.which === 13) {
    e.preventDefault();
    return false;
  }
});

// search feature 
$('#search').keyup(function() {
  var filter = $(this).val();
  $('.list').each(function() {
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).fadeOut();
    } else {
      $(this).show();
    }
  });
});