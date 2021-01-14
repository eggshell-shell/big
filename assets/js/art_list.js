$(() => {
    var layer = layui.layer
    var form = layui.form

    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = String(dt.getMonth() + 1).padStart(2, '0')
        var d = String(dt.getDate()).padStart(2, '0')

        var hh = String(dt.getHours()).padStart(2, '0')
        var mm = String(dt.getMinutes()).padStart(2, '0')
        var ss = String(dt.getSeconds()).padStart(2, '0')
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 4, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initCate()
    initTable()


    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0)
                        return layer.msg(res.message)
                    layer.msg(res.message)
                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : p.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })
    })



    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                initPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0)
                    return layer.msg(res.message)
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    function initPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                first == true ? null : initTable()
            }
        })
    }
})