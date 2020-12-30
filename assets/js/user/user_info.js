$(function(e) {
    var form = layui.form;
    var layor = layui.layui;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()

    $("form").on('submit', function(e) {
        e.preventDefault();
        let data =
            $.ajax({
                method: "POST",
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('更新用户信息失败')
                    }
                    layui.layer.msg('更新用户信息成功')
                    console.log(res);
                    window.parent.getUserInfo()
                }
            })
    });
    $("#btnReset").on('click', function(e) {
            e.preventDefault();
            initUserInfo()
        })
        // 获取用户初始化信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    function postUserInfo(data) {

    }
})