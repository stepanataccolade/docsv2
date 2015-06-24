function sticky_relocate() {
    var footer_top = $('#footer.bg').offset().top;
    var page_bottom = $(window).scrollTop() + $(window).height();
    var margin = $('#article').height() - $('.tocbar').height();
    if (page_bottom > footer_top) {
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