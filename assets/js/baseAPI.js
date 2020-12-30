$.ajaxPrefilter(function(options) {
    // 拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 给带有/my/路径参数的属性拼接头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        }
    }
    options.complete = function(res) {
        // console.log('执行了complete函数');
        // 在complete中的res.responseJSON === success里的res
        // console.log(res.responseJSON);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})