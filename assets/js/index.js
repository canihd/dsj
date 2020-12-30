// 获取用户基本信息函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                // return;
                return layui.layer.msg(res.message);
            }
            let data = res.data;
            let uname = data.nickname || data.username;
            // console.log($("#welcome")[0]);
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
                .siblings(".text-avatar")
                .hide()
        },
        // complete: function(res) {
        //     // console.log('执行了complete函数');
        //     // 在complete中的res.responseJSON === success里的res
        //     console.log(res.responseJSON);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    });
}

$(function() {
    getUserInfo();

    var layer = layui.layer;
    $("#btnLogout ").on('click', function(e) {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                // do something
                localStorage.removeItem('token');
                location.href = '/login.html'

                layer.close(index)
            })
    })
});