$(() => {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }
        , pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ]
        , repass: function (value) {
            var pass = $('.reg-box :password').val()
            if (pass != value)
                return '两次密码不一致'
        }
    });
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0)
                return layer.msg(res.message)
            layer.msg(res.message)
            $('#link_login').click()
        })
    })
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                $.cookie('token', res.token, { expires: 7 }); //存入cookie写法（expires:7表示设置有效期为7天）
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })

})