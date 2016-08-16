$(document).ready(function () {
  $('#side-nav h4').click(function(){
    $(this).next('ul').toggleClass('active');
  });
});