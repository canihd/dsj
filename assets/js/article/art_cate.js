$(function(e) {
    let { form, layer } = layui;
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd = null;
    var indexEdit = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 为添加类别按钮绑定点击事件

    $("body").on([{
        'submit #form-add': function(e) {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "/my/article/addcates",
                data: $('#form-add').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功！')
                        // 根据索引，关闭对应的弹出层
                    layer.close(indexAdd)
                }
            })
        },

    }])
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        const id = $(this).data("id");

        console.log(id);

        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                console.log(res);
                form.val('form-edit', res.data)
                $("#tpl-table [name=name]").val(res.data.name)
                $("#tpl-table [name=alias]").val(res.data.alias)
            }
        })
    })
})