function getUserInfo() {
    axios.get('/my/userinfo').then(function(res){
        if (res.data.status !== 0) {
            return  layer.msg("获取用户信息失败")
        }
        avatarAndName(res.data.data)
    })
}
getUserInfo()
function avatarAndName(res) {
    let name = res.nickname || res.username
    $('#welcome').text('欢迎' + name)
    if (res.user_pic) {
        $('.text_avatar').hide()
        $('.layui-nav-img').attr('src',res.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text_avatar').text(first).show()
    }
}

$('#logout').on('click',function() {
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
        location.href = "/home/login.html"
        localStorage.removeItem('token')
        layer.close(index);
      });
})