$(document).ready(function() {

  // show the first quote once loaded
  getQuotes();

  // quote API - thanks to Forismatic.com
  function getQuotes() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      data: {
        lang: "en",
        method: "getQuote",
        format: "jsonp"
      },
      dataType: "jsonp",
      success: function(data) {

        // if no author then author is "Anonymous"
        if (!data.quoteAuthor) {
          data.quoteAuthor = "Anonymous";
        }

        // remove semi-colons because it ends quote
        data.quoteText = data.quoteText.replace(/;/g, "");

        // fade effects
        $('#quote').fadeOut(1000, showQuotes);
        $('#quote').fadeIn(1000);

        // show the quotes on page
        function showQuotes() {
          $('#quote').html('<blockquote><p>' + data.quoteText + '</p><footer>' + data.quoteAuthor + '</footer></blockquote>');
        }

        // shoten tweet to 140 characters
        let shortenQuote = data.quoteText;
        if (("Great quote! " + '"' + data.quoteText + '"' + " - " + data.quoteAuthor).length > 140) {
          let limitQuote = 137 - ("Great quote! " + '"' + '"' + " - " + data.quoteAuthor).length;
          shortenQuote = data.quoteText.substring(0, limitQuote) + "...";
        }

        // tweet the quote
        tweet("Great quote! " + '"' + shortenQuote + '"' + " - " + data.quoteAuthor);
      }
    });
  }

  // show new quotes when button clicked
  $('#button').on('click', function() {
    getQuotes();
  });

  // function to tweet the quotes
  function tweet(text) {
    $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text=" + text);
  }
});