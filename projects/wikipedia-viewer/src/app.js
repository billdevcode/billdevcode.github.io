$(document).ready(function() {

  var title = [],
    desc = [],
    link = [],
    val = $('#search-box'),
    url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';

  $('#search-box').focus();

  $('.search-button').click(function() {
    $('.wiki-container').empty();
    $.getJSON(url + val.val() + '&callback=?').success(function(data) {

      for (i = 0; i < data[1].length; i++) {
        title = data[1][i];
        if (data[2][i] === '') {
          desc = "No description"
        } else {
          desc = data[2][i];
        }
        link = data[3][i];

        $('.wiki-container').append('<div class="results"><a href="' + link + '" target="_blank"><h3><br>' + title + '</h3></a><p>' + desc + '</p></div>');
      }
    });
  });

  $('#search-box').click(function() {
    $(this).val('');
  });

  //enables the "enter" key to perform search
  $('#search-box').keydown(function(e) {
    if (e.which === 13) {
      $('.search-button').click();
      $('#search-box').blur();
    }
  });
});