$(() => {
    var layer = layui.layer
    var form = layui.form
    initWz()
    var index = null
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status != 0)
                        return layer.msg(res.message)
                    layer.msg(res.message)
                    layer.close(index)
                    initWz()
                }
            })
        })

    })
    var index_2 = null
    $("tbody").on('click', '.btn-edit', function () {
        index_2 = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                form.val('form-edit', res.data)
            }
        })
    })


    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(index_2)
                initWz()
            }
        })
    })


    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'get',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status != 0)
                            return layer.msg(res.message)
                        layer.msg(res.message)
                        layer.close(index)
                        initWz()
                    }
                })
            })
    })

    function initWz() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})