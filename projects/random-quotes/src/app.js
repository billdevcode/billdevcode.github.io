$(document).ready(function() {

  
  // show the first quote once loaded
  getQuotes();

  
  function getQuotes() {

    var rand = Math.floor(Math.random() * 49);
  
    // fade effects
    $('#quote').fadeOut(1000, showQuotes);
    $('#quote').fadeIn(1000);

    // show the quotes on page
    function showQuotes() {
      $('#quote').html('<blockquote><p>' + quotes[rand] + '</p><footer>' + authors[rand] + '</footer></blockquote>');
    }

    // shoten tweet to 140 characters
    let shortenQuote = quotes[rand];
    if (("Great quote! " + '"' + quotes[rand] + '"' + " - " + authors[rand]).length > 140) {
      let limitQuote = 137 - ("Great quote! " + '"' + '"' + " - " + authors[rand]).length;
      shortenQuote = quotes[rand].substring(0, limitQuote) + "...";
    }

    // tweet the quote
    tweet("Great quote! " + '"' + shortenQuote + '"' + " - " + authors[rand]);
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