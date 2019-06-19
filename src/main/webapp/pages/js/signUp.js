/**
 * Created by win10 on 2019/5/18.
 */
var addr = window.location.href.split("/")[2]
$(document).ready(function(){
    $("#submit").click(function(){
        htmlobj = $.ajax({
            url: "http://"+addr+"/SignUp",
            data: {
                username: $("#register_username").val(),
                password: $("#register_password").val(),
                usertype: $("input[type='radio']:checked").val()
            },
            async:false,
            type:"POST"
        });

        if (htmlobj.responseText == "true") {
            new PNotify({
                title: 'Success',
                text: '用户创建成功，请登录',
                type: 'success',
                styling: 'bootstrap3'
            });
            $(window).attr('location', 'login.html#signin');

        }else{
            new PNotify({
                title: 'Oh No!',
                text: '用户名已注册！',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    })

});