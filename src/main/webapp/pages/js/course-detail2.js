/**
 * Created by win10 on 2019/5/18.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
var str = decodeURI(window.location.href.split("#")[1])
var teacher = str.split('-')[0]
var course = str.split('-')[1]
$(document).ready(function(){
    $('#course').html(course)
    $('.ui-pnotify-container').hide();
    $("#welcome_word").html("Welcome,"+username)
    $("#nav_user").html(username)
    getHomeworkList(teacher,$('#course').html())
    $('#search-btn').click(function () {
        var val = $('#search').val()
        getHomeworkListByVal(val,teacher,$('#course').html())
    })
})

function getHomeworkList(teacher,course) {
    var dir = "/user/aiSystemUser/"+teacher+"/course/"+course+"/";
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetCourseDetailList",
        async: false,
        data: {
            dir: dir
        },
        type: "POST"
    });
    var i = 0;
    var html = ""
    var num = 1;
    $.each($.parseJSON(htmlobj.responseText), function (idx, obj) {
        var name = obj.name
        var modifyTime = obj.modifyTime
        var str=""
        str+='<tr data-toggle="modal" data-target=".modalTarget" onclick="tdClick(this)">'+
            '<td>'+num+'</td>'+
            '<td>'+name+'</td>'+
            '<td>'+modifyTime+'</td>'+
            '</tr>'

        html+=str;
        num+=1;
    });
    $("#homework_list").html(html)
}

function getHomeworkListByVal(val,teacher,course) {
    var regExp=new RegExp(val)
    var dir = "/user/aiSystemUser/"+teacher+"/course/"+course+"/";
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetCourseDetailList",
        async: false,
        data: {
            dir: dir
        },
        type: "POST"
    });
    var i = 0;
    var html = ""
    var num = 1;
    $.each($.parseJSON(htmlobj.responseText), function (idx, obj) {
        if(regExp.test(JSON.stringify(obj))) {
            var name = obj.name
            var modifyTime = obj.modifyTime
            var str = ""
            str += '<tr data-toggle="modal" data-target=".modalTarget" onclick="tdClick(this)">' +
                '<td>' + num + '</td>' +
                '<td>' + name + '</td>' +
                '<td>' + modifyTime + '</td>' +
                '</tr>'

            html += str;
            num += 1;
        }
    });
    $("#homework_list").html(html)
}

function tdClick(obj){
    var td = $(obj).find("td");
    var content_name = td.eq(1).text();
    var num = td.eq(0).text();
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetCourseDetailContent",
        async: false,
        data: {
            path: "/user/aiSystemUser/"+teacher+"/course/"+course+"/"+content_name+".txt"
        },
        type: "POST"
    });
    $(".modal-title").html(content_name)
    $(".modal-body").html(htmlobj.responseText)
}