
var dialog_gift = null;

$(function () {

    var is_show_more = false;

    $("#section_news > div").css("display", "none");
    $("#section_news > div:eq(0)").css("display", "");

    $(".news_list").each(function () {
        $(this).find("div:last-child").find("p").each(function (i) {
            if (i >= 5) {
                $(this).css("display", "none");
            }
        });
    });


    $("#news_list_tab li").click(function () {
        var index = 0;
        var clickItem = this;
        $("#news_list_tab li").each(function (i) {


            $(this).removeClass("selected");
            if (this == clickItem) {
                index = i;
            }
        });

        $(this).addClass("selected");

        $("#section_news > div").css("display", "none");
        $("#section_news > div:eq(" + index + ")").fadeIn();
    });


    $("#btn_show_more_news").click(function () {
        if (is_show_more == false) {
            is_show_more = true;
            $("#btn_show_more_news").html("收起");

            $(".news_list").each(function () {
                $(this).find("div:last-child").find("p").css("display", "");
            });
        }
        else {
            is_show_more = false;
            $("#btn_show_more_news").html("查看更多资讯>>");


            $(".news_list").each(function () {
                $(this).find("div:last-child").find("p").each(function (i) {
                    if (i >= 5) {
                        $(this).css("display", "none");
                    }
                });
            });
        }
    });

    dialog_gift = new Dialog($("#dialog_game_gift_content").html(), {
        id: 'dialog_game_gift_content'
    });


});



function get_gift(id){
    $.ajax({
        type: "post",
        url: '/index.php?m=wap&c=gift_code&a=getGift_cache',
        data:"category="+id,
        dataType: "json",
        success: function (data) {
            msg = data['msg'];
            $("#getgift_info").html(msg);
            dialog_gift = new Dialog($("#dialog_game_gift_content").html(), {
                id: 'dialog_game_gift_content'
            });
            dialog_gift.show();
        },
    });
}


