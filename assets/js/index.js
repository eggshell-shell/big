$(() => {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' },
            function () {
                localStorage.removeItem('token')
                location.href = 'login.html'
                layer.close()
            })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0)
                return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}
