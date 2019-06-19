/**
 * Created by win10 on 2019/5/18.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
$(document).ready(function(){
    $('.ui-pnotify-container').hide();
    $("#welcome_word").html("Welcome,"+username);
    $("#nav_user").html(username);
    getCourseList(username);
    $('#search-btn').click(function () {
        var val = $('#search').val()
        getCourseListByVal(val,username)
    })
    $('#submit').click(function(){
        var course_name = $('#course-name').val();
        var course_type = $('#course-type').val();
        var course_time = $('#course-time').val();
        var course_place = $('#course-place').val();
        var course_total_time = $('#course-total-time').val();
        var course_point = $('#course-point').val();

        result = $.ajax({
            url: "http://"+addr+"/AddCourse",
            async: false,
            data: {
                course_name:course_name,
                course_teacher:username,
                course_type:course_type,
                course_time:course_time,
                course_place:course_place,
                course_total_time:course_total_time,
                course_point:course_point
            },
            type: "POST"
        });
        if(result.responseText=="true"){
            $(".modal-backdrop").css("display", "none");
            $(".modal").css("display", "none");
            new PNotify({
                title: 'Success',
                text: '添加成功',
                type: 'success',
                styling: 'bootstrap3'
            });
            getCourseList(username);
        }else{
            new PNotify({
                title: 'Error',
                text: '添加失败',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });

    $(".delete").click(function(){
        var course_name = $(this).attr("name")
        var teacher_name = username;
        result = $.ajax({
            url: "http://"+addr+"/DeleteCourse",
            async: false,
            data: {
                course_name: course_name,
                teacher_name:teacher_name
            },
            type: "POST"
        });
        if(result.responseText=="true"){
            new PNotify({
                title: 'Success',
                text: '删除成功',
                type: 'success',
                styling: 'bootstrap3'
            });
            getCourseList(username);
        }else{
            new PNotify({
                title: 'Error',
                text: '删除失败',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
});

function tdClick(obj){
    var td = $(obj).parent().find("td");
    var course_name = td.eq(1).text();
    window.location.href="http://"+addr+"/pages/detail.html#"+course_name;
}

function getCourseList(teacher_name){
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetCourseList",
        async: false,
        data: {
            teacher_name:teacher_name
        },
        type: "POST"
    });
    var i=0;
    var num=1;
    var html="";
    $.each($.parseJSON(htmlobj.responseText), function(idx, obj) {
        if(i==0) {
            i = 1;
            var course_list=""
            course_list+="<tr class='even pointer'>"+
                "<td onclick='tdClick(this)'>"+num+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_name+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "<td ><button class='btn btn-danger btn-xs delete' name='"+obj.course_name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                "</tr>"
        }
        if(i==1) {
            i=0;
            var course_list=""
            course_list+="<tr class='even pointer'>"+
                "<td onclick='tdClick(this)'>"+num+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_name+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "<td ><button class='btn btn-danger btn-xs delete' name='"+obj.course_name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                "</tr>"
        }
        num+=1;
        html+=course_list;
    });
    $("#course-list").html(html)
}

function getCourseListByVal(val,teacher_name){
    var regExp=new RegExp(val)
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetCourseList",
        async: false,
        data: {
            teacher_name:teacher_name
        },
        type: "POST"
    });
    var i=0;
    var num=1;
    var html="";
    $.each($.parseJSON(htmlobj.responseText), function(idx, obj) {
        if(regExp.test(JSON.stringify(obj))) {
            if (i == 0) {
                i = 1;
                var course_list = ""
                course_list += "<tr class='even pointer'>" +
                    "<td onclick='tdClick(this)'>" + num + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_name + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_type + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_place + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_total_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_point + "</td>" +
                    "<td ><button class='btn btn-danger btn-xs delete' name='" + obj.course_name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                    "</tr>"
            }
            if (i == 1) {
                i = 0;
                var course_list = ""
                course_list += "<tr class='even pointer'>" +
                    "<td onclick='tdClick(this)'>" + num + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_name + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_type + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_place + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_total_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_point + "</td>" +
                    "<td ><button class='btn btn-danger btn-xs delete' name='" + obj.course_name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                    "</tr>"
            }
            num += 1;
            html += course_list;
        }
    });
    $("#course-list").html(html)
}