!function(n){function a(){n.ajax({url:"/api",success:function(a){var t=n(a).find("#TabStats").find('td:contains("ROI")').next("td").text();n(".page-hero--inner .fv-roi").text("ROI - "+t)}})}n.ajax({url:"/api",success:function(a){var t=n(a).find("#TabStats").find('td:contains("ROI")').next("td").text();n(".page-hero--inner").append(n('<div class="fv-roi"> ROI - '+t+"</div>"))}}),setInterval(a,7e3),n(".navbar-toggler").on("click",function(){n("body").toggleClass("menu-open"),n("body").hasClass("menu-open")?n("body").addClass("scroll-off"):n("body").removeClass("scroll-off")})}(jQuery);
//# sourceMappingURL=../maps/scripts/app-8b72cdd13d.js.map
