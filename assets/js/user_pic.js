$(() => {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    getUserPic()

    $('#shangchuan').click(function () {
        $('input:eq(0)').click()
    })
    $('input:eq(0)').on('change', function (e) {
        var filelist = this.files
        if (filelist.length == 0)
            return layer.msg('请选择图片')
        var file = this.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    $('#queding').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串   
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
    // $('#wj').on('change', function () {
    //     var file = this.files[0]
    //     console.log(file);
    // })
})
function getUserPic() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                var url_pic = (res.data.user_pic == null) ? '../assets/images/sample.jpg' : res.data.user_pic
                // $("#image").attr('src', url_pic)
                var $image = $('#image')
                // 1.2 配置选项
                const options = {
                    // 纵横比
                    aspectRatio: 1,
                    // 指定预览区域
                    preview: '.img-preview'
                }
                // 1.3 创建裁剪区域
                $image.cropper(options)
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', url_pic)  // 重新设置图片路径
                    .cropper(options)
            }
        }
    })
}
