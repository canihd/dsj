$(function(e) {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到16位，且不能出现空格'],

        samePwd: function(value) {
            if (value === $('[name=oldpsw]').val()) {
                return '新旧密码不能相同'
            }
        },
        resetPwd: function(value) {
            if (value !== $('[name=newpsw').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    $(".layui-form").on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})