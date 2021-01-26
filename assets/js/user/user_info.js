$(function(){
    //获取ajax 获取用户的基本信息
    let form = layui.form
    function getUserInfo() {
        axios.get('/my/userinfo').then(function(res){
            //给表单赋值
            form.val("form", res.data.data);
        })
    }
    getUserInfo()
    //自定义表单验证
    form.verify({
        nickname: function(value){ //value：表单的值、item：表单的DOM对象
          if(value.length < 2 || value.length > 6){
            return '昵称长度需要在2-6个字符';
          }
        }
    })
    //提交
    $("#form").on('submit',function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        axios.post('/my/userinfo',data).then(function(res){
           if (res.data.status !== 0) {
               return layer.msg("修改用户信息失败")
           }
           layer.msg(res.data.message)
           window.parent.getUserInfo()
        })
    })

    //重置
    $('#resetBtn').on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })















})