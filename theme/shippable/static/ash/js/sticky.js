$( document ).ready( function() {
    var sidebar_bottom = $('.tocbar').position().top+$('.tocbar').outerHeight(true);
    $('.sticky-anchor').css("top", sidebar_bottom)
})

function sticky_relocate() {
    var footer_top = $('#footer.bg').offset().top;
    var anchor_bottom = $('.sticky-anchor').offset().top+$('.sticky-anchor').outerHeight(true);
    if (anchor_bottom > footer_top) {
        $('#sidebar .tocbar').addClass('stick');
        $('#sidebar').height( $('#mainbar').height() );
    } else {
        $('#sidebar .tocbar').removeClass('stick');
    }
}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});

$(document).click(function() {
    sticky_relocate();
});