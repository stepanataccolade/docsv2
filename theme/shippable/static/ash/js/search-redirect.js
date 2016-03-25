$(document).ready(function() {
  $('#mkdocs-search-query').submit(function () {
    var q = $('#mkdocs-search-query').val();
    window.location.href = "http://docs.shippable.com/search.html?q=" + q;
  })
 });