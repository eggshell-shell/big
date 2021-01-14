$(() => {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                parent.getUserInfo()
            }
        })
    })

    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }
})
