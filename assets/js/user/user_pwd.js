$(function(){
    let form = layui.form
    form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
        newPwd:function(value){
            let oldPwd = $('[name="oldPwd"]').val()
            if (value == oldPwd) {
                return '新密码不能与原密码相同'
            }
        },
        reNewPwd:function(value){
            let newPwd = $('[name=newPwd]').val()
            if (value !== newPwd) {
                return '俩次输入得密码不一致'
            }
        }
    })
    
    $('#form').on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        axios.post('/my/updatepwd',data).then(function(res){
            layer.msg(res.data.message)
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            layer.msg(res.data.message)
            $('#form')[0].reset()
        })
    })


})