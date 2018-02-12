(function ($) {
    $.ajax({
        url: "/api",
        success: function (result) {
            var bitData = $(result).find('#TabStats').find('td:contains("ROI")').next('td').text();
            $('.page-hero--inner').append($('<div class="fv-roi"> ROI - ' + bitData + '</div>'));
        }
    });
    setInterval(ajaxCall, 7000);
    function ajaxCall() {
        $.ajax({
            url: "/api",
            success: function (result) {
                var bitData = $(result).find('#TabStats').find('td:contains("ROI")').next('td').text();

                $('.page-hero--inner .fv-roi').text('ROI - ' + bitData);
            }
        });
    }
    $('.navbar-toggler').on('click', function () {
        $('body').toggleClass('menu-open');

        if ($('body').hasClass('menu-open')) {
            $('body').addClass("scroll-off");
        } else {
            $('body').removeClass("scroll-off");
        }

    });
})(jQuery);