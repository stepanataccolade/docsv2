$(document).ready(function() {
  $('#mkdocs-search-query').keypress(function(e) {
    if(e.which == 13) {
      var q = $('#mkdocs-search-query').val();
      window.location.href = "http://docs.shippable.com/search.html?q=" + q;
      return false;
    }
  });
});