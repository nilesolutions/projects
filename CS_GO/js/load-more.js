jQuery(window).load(function() {
    size_row = $(".popup-holder .row").size();
    x=10;
    $('.popup-holder .row:lt('+x+')').show();
    $('.btn-load-More').click(function () {
        x= (x+5 <= size_row) ? x+5 : size_row;
        $('.popup-holder .row:lt('+x+')').show();
    });
});