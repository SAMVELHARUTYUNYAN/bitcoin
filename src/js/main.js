(function ($) {


    var $bodyEl = $('body'),
        $roiLiveEl = $('.btl-roi--row'),
        $roiValueEl = $('.btl-roi--value'),
        $roiPrc = $('#btl-roi--prc'),
        $roiDays = $('#btl-roi--days');


    var fetchROI = function (parentElString) {
        var htmlRes,
            percentage,
            days;

        $.ajax({
            url: '/api',
            success: function (res) {
                htmlRes = res.replace(/<img[^>]*>/g, "");

                var statsTabSelector = htmlRes.substr(htmlRes.search(parentElString), parentElString.length);
                var $statsEl = $(htmlRes).find('#' + statsTabSelector);
                var $roiEl = $statsEl.find('td:contains("ROI")');
                var roiStrArr = $roiEl.next().text().split(' ');

                console.log(roiStrArr);

                for (var i = 0; i < roiStrArr.length; i++) {
                    if (roiStrArr[i].includes('%')) {
                        percentage = roiStrArr[i];
                        $roiPrc.text(percentage);
                    }
                    if (roiStrArr[i].includes('days') > 0) {
                        days = roiStrArr[i - 1];
                        $roiDays.text(' / ' + days + ' days');
                    }
                }

            },
            error: function (err) {
                console.log(err);

                $roiValueEl.html('<p>' + err + '</p>');
            },
            complete: function () {
                $roiLiveEl.removeClass('fetching');
            }
        });
    };

    setInterval(function () {
        fetchROI('TabStats');
    }, 5000);

    $(window).on('load', function () {
        $bodyEl.addClass('scale-down--svg');
        setTimeout(function () {
            $bodyEl.addClass('loaded').removeClass('scale-down--svg');
            $roiLiveEl.addClass('fetching');
        }, 1000);
    });

    $bodyEl.on('click', '.navbar-toggler', function (e) {
        if (!$bodyEl.hasClass('btl-nav--open')) {
            $bodyEl.addClass('btl-nav--open');
        } else {
            $bodyEl.removeClass('btl-nav--open');
        }

    });


})(jQuery);