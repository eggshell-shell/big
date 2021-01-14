$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        var layer = layui.layer
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token')
            layer.msg(res.responseJSON.message)
            setTimeout(function () {
                // window.parent.localStorage.removeItem('token')
                window.location.href = 'login.html'
            }, 1000)

        }
    }
})