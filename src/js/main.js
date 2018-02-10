(function($) {

    $('.navbar-toggler').on('click', function () {
        $('body').toggleClass('menu-open');

        if($('body').hasClass('menu-open')){
            $('body').addClass("scroll-off");
        } else{
            $('body').removeClass("scroll-off");
        }

    });
})(jQuery);