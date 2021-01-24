$(function(){
    $('#gotoLogin').on('click',function() {
        $('.loginBox').hide()
        $('.regiBox').show()
    })
    $('#gotoRegi').on('click',function() {
        $('.loginBox').show()
        $('.regiBox').hide()
    })
    let form = layui.form
    form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
        repass: function(value) {
            let pwd = $(".regiBox [name=password]").val()
            if (value !== pwd) {
                // 说明两次密码不一致
                return "两次密码不一致";
            }
        }
      });      
            
      $('.regiBox form').on('submit',function(e){
        e.preventDefault()
        let fd = $(this).serialize()
        axios.post('http://api-breakingnews-web.itheima.net/api/reguser',fd).then(function(res){
            console.log(res);
            layer.msg(res.data.message)
        })
      })

      $('.loginBox form').on('submit',function(e){
          e.preventDefault()
          let fd = $(this).serialize()
          axios.post('http://api-breakingnews-web.itheima.net/api/login',fd).then(function(res){
            console.log(res);
            if (res.data.status === 0) {
                location.href = "/home/index.html"
            }
            layer.msg(res.data.message)
            localStorage.setItem("token", res.data.token)
        })

      })
})