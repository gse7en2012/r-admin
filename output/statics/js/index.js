

$(function () {
    //$("#right_item_yxzl dt").each(function (i) {
    //    $(this).click(function () {
    //        $("#right_item_yxzl dd").each(function (j) {
    //            if (i == j) {
    //                $(this).css("display", "");
    //            }
    //            else {
    //                $(this).css("display", "none");
    //            }
    //        });
    //    });
    //});


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
            $('body,html').animate({ scrollTop: 0 }, 1000);
            return false;
        });
    });

}); 