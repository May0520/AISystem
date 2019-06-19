/**
 * Created by win10 on 2019/5/18.
 */
$(document).ready(function(){
    var addr = window.location.href.split("/")[2]
    $('.ui-pnotify-container').hide();
    $('#password').bind('keydown',function(event){
        if(event.keyCode == "13")
        {
            submit()
        }
    });
    $("#login").click(function(){
        submit()
    })

});

function submit(){
    htmlobj = $.ajax({
        url: "http://"+addr+"/Login",
        data: {
            username: $("#username").val(),
            password: $("#password").val()
        },
        async:false,
        type:"POST"
    });
    if (htmlobj.responseText == "Teacher") {
        $.cookie('username', $("#username").val());
        $(window).attr('location', 'home.html');
    }else if(htmlobj.responseText == "Student") {
        $.cookie('username', $("#username").val());
        $(window).attr('location', 'student.html');
    }else{
        new PNotify({
            title: 'Oh No!',
            text: '用户名密码错误！',
            type: 'error',
            styling: 'bootstrap3'
        });
    }
}