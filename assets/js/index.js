// 获取用户基本信息函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return;
                return layui.msg(res.message);
            }
            let data = res.data;
            let uname = data.nickname || data.username;
            console.log(res);
            $("#welcome").html("欢迎&nbsp;&nbsp;" + uname);
            data.user_pic === null &&
                $(".layui-nav-img")
                .hide()
                .siblings(".text-avatar")
                .show()
                .html(uname.substr(0, 1)
                    .toUpperCase()) || $(".layui-nav-img")
                .show()
                .attr('src', data.user_pic)
                .sibling(".text-avatar")
                .hide()
        },
    });
}

$(function(e) {
    getUserInfo();
    $("#btnLogout").click(function(e) {

    })
});