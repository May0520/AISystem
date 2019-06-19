/**
 * Created by win10 on 2019/5/18.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
$(document).ready(function(){
    $('.ui-pnotify-container').hide();
    $("#welcome_word").html("Welcome,"+username);
    $("#nav_user").html(username);
    $("#choose_course_btn").click(getChooseCourseList())
    getCourseList(username);
    $('#search-btn').click(function () {
        var val = $('#search').val()
        getCourseListByVal(val,username)
    })
});
function getChooseCourseList() {
    result = $.ajax({
        url: "http://"+addr+"/GetStudentChooseCourseList",
        async: false,
        data: {
            student_name:username
        },
        type: "POST"
    });
    var i=0;
    var num=1;
    var html="";
    $.each($.parseJSON(result.responseText), function(idx, obj) {
        if(i==0) {
            i = 1;
            var course_list=""
            course_list+="<tr class='even pointer'>"+
                "<td onclick='tdClick(this)'>"+num+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_name+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_teacher+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "<td><a href='#' class='btn btn-primary btn-xs' onclick='chooseCourse(this)'>Choose</a></td>"+
                "</tr>"
        }
        if(i==1) {
            i=0;
            var course_list=""
            course_list+="<tr class='even pointer'>"+
                "<td onclick='tdClick(this)'>"+num+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_name+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_teacher+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "<td><a href='#' class='btn btn-primary btn-xs' onclick='chooseCourse(this)'>Choose</a></td>"+
                "</tr>"
        }
        num+=1;
        html+=course_list;
    });

    $("#choose_course-list").html(html)
}
function chooseCourse(obj){
    var td = $(obj).parents('tr').find("td");
    var course_name = td.eq(1).text();
    var teacher_name = td.eq(2).text();
    htmlobj = $.ajax({
        url: "http://"+addr+"/ChooseCourse",
        async: false,
        data: {
            teacher_name:teacher_name,
            course_name:course_name,
            student_name:username
        },
        type: "POST"
    });
    if(htmlobj.responseText=="true"){
        new PNotify({
            title: 'Success',
            text: '选课成功',
            type: 'success',
            styling: 'bootstrap3'
        });
        getChooseCourseList()
        getCourseList(username);
    }else{
        new PNotify({
            title: 'Error',
            text: '选课失败',
            type: 'error',
            styling: 'bootstrap3'
        });
    }
}
function tdClick(obj){
    var td = $(obj).parent().find("td");
    var course_name = td.eq(1).text();
    var teacher_name = td.eq(2).text();
    window.location.href="http://"+addr+"/pages/course-detail.html#"+teacher_name+'-'+course_name;
}

function getCourseList(student){
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetStudentCourseList",
        async: false,
        data: {
            student_name:student
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
                "<td onclick='tdClick(this)'>"+obj.course_teacher+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "</tr>"
        }
        if(i==1) {
            i=0;
            var course_list=""
            course_list+="<tr class='even pointer'>"+
                "<td onclick='tdClick(this)'>"+num+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_name+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_teacher+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_type+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_place+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_total_time+"</td>"+
                "<td onclick='tdClick(this)'>"+obj.course_point+"</td>"+
                "</tr>"
        }
        num+=1;
        html+=course_list;
    });
    $("#course-list").html(html)
}

function getCourseListByVal(val,student){
    var regExp=new RegExp(val)
    htmlobj = $.ajax({
        url: "http://"+addr+"/GetStudentCourseList",
        async: false,
        data: {
            student_name:student
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
                    "<td onclick='tdClick(this)'>" + obj.course_teacher + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_type + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_place + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_total_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_point + "</td>" +
                    "</tr>"
            }
            if (i == 1) {
                i = 0;
                var course_list = ""
                course_list += "<tr class='even pointer'>" +
                    "<td onclick='tdClick(this)'>" + num + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_name + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_teacher + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_type + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_place + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_total_time + "</td>" +
                    "<td onclick='tdClick(this)'>" + obj.course_point + "</td>" +
                    "</tr>"
            }
            num += 1;
            html += course_list;
        }
    });
    $("#course-list").html(html)
}