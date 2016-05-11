$(function () {
    $("#right_item_yxzl dt").each(function (i) {
        $(this).click(function () {
            $("#right_item_yxzl dd").each(function (j) {
                if (i == j) {
                    if ($(this).css('display') == "none") {
                        $(this).css("display", "block");
                    } else {
                        $(this).css("display", "none");
                    }
                }
            });
        });
    });


    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#goTopBtn").fadeIn(1500);
            }
            else {
                $("#goTopBtn").fadeOut(1500);
            }
        });

        //当点击跳转链接后，回到页面顶部位置

        $("#goTopBtn").click(function () {
            $('body,html').animate({scrollTop: 0}, 1000);
            return false;
        });
    });


    var jcarousel = $('.jcarousel');

    jcarousel.on('jcarousel:reload jcarousel:create', function () {
            jcarousel.jcarousel('items').width(jcarousel.innerWidth());
        })
        .jcarousel({
            wrap: 'circular',
            transitions: Modernizr.csstransitions ? {
                transforms: Modernizr.csstransforms,
                transforms3d: Modernizr.csstransforms3d,
                easing: 'ease'
            } : false
        })
        .jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });


    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

});