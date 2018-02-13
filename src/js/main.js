(function ($) {


    var $bodyEl = $('body'),
        $roiLiveEl = $('.btl-roi--values'),
        $roiValueEl = $('.btl-roi--value'),
        $roiPrc = $('#btl-roi--prc'),
        $roiDays = $('#btl-roi--days');


    var fetchROI = function (parentElString, callback) {
        var htmlRes,
            percentage,
            days;

        $roiLiveEl.addClass('fetching');

        $.ajax({
            url: '/api',
            success: function (res) {
                htmlRes = res.replace(/<img[^>]*>/g, "");

                var statsTabSelector = htmlRes.substr(htmlRes.search(parentElString), parentElString.length);
                var $statsEl = $(htmlRes).find('#' + statsTabSelector);
                var $roiEl = $statsEl.find('td:contains("ROI")');
                var roiStrArr = $roiEl.next().text().split(' ');

                for (var i = 0; i < roiStrArr.length; i++) {
                    if (roiStrArr[i].includes('%')) {
                        percentage = roiStrArr[i];
                        $roiPrc.text(percentage);
                    }
                    if (roiStrArr[i].includes('days')) {
                        days = roiStrArr[i - 1];
                        $roiDays.text(days + ' days');
                    }
                }

            },
            error: function (err) {
                console.log(err);

                $roiValueEl.text('?');
                $roiLiveEl.addClass('fetch-error');
            },
            complete: function () {

                setTimeout(function () {
                    $roiLiveEl.removeClass('fetching');
                    $roiLiveEl.removeClass('fetchError');
                }, 500)

            }
        });

        if (!!callback) {
            callback();
        }
    };

    fetchROI('TabStats', function () {
        setInterval(function() {
            fetchROI('TabStats');
        }, 10000);
    });

    $(window).on('load', function () {
        $bodyEl.addClass('scale-down--svg');
        $bodyEl.addClass('loaded').removeClass('scale-down--svg');
        setTimeout(function () {
            $('.btl-logo--chars .btl-logo--wh').each(function (i, el) {
                setTimeout(function () {
                    $(el).addClass('revealed');
                }, i + (i-1) * 20 )
            });
        }, 500);

    });

    $bodyEl
        .on('click', '.navbar-toggler', function (e) {
            if (!$bodyEl.hasClass('btl-nav--open')) {
                $bodyEl.addClass('btl-nav--open');
            } else {
                $bodyEl.removeClass('btl-nav--open');
            }

        })
        .on('click', '.btl-nav a', function (e) {
            console.log(e);
            var $target = $($(this).attr('href'));
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 500);
        })




})(jQuery);