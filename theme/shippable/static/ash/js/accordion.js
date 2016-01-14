$(document).ready(function () {
  $('#side-nav > li > a').mouseover(function(){
    if ($(this).attr('class') != 'active'){
      $('#side-nav li ul').slideUp();
      $(this).next().slideToggle();
      $('#side-nav li a').removeClass('active');
      $(this).addClass('active');
    }
  });
});