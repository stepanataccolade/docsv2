$(document).ready(function() {
  $('#mkdocs-search-query').submit(function () {
    var q = $('#mkdocs-search-query').val();
    alert("Searched " + q);
    window.location.href = "http://docs.shippable.com/search.html?q=" + q;
  })
 });