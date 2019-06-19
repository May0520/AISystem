/**
 * Created by win10 on 2019/5/18.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
$(document).ready(function(){
    $('.ui-pnotify-container').hide();
    $("#recent_dir").html("/user/aiSystemUser/"+username+"/")
    $("#welcome_word").html("Welcome,"+username)
    $("#nav_user").html(username)
    getDirList("/user/aiSystemUser/"+username)
    $('#search-btn').click(function () {
        var val = $('#search').val()
        getDirListByVal(val,$("#recent_dir").html())
    })
   $("#mkdir").click(function(){
       if($("#mkdir_name").val()==""){
           new PNotify({
               title: 'Error',
               text: '请输入文件夹名称！',
               type: 'error',
               styling: 'bootstrap3'
           });
       }else {

           result = $.ajax({
               url: "http://"+addr+"/Mkdir",
               async: false,
               data: {
                   dir: $("#recent_dir").html()+$("#mkdir_name").val()
               },
               type: "POST"
           });
           if (result.responseText == "true") {
               $(".modal-backdrop").css("display", "none")
               $(".modal").css("display", "none")
               new PNotify({
                   title: 'Success',
                   text: '文件夹创建成功',
                   type: 'success',
                   styling: 'bootstrap3'
               });
               getDirList($("#recent_dir").html());

           } else {
               alert(result.responseText)
               new PNotify({
                   title: 'Error',
                   text: '文件夹创建失败！',
                   type: 'error',
                   styling: 'bootstrap3'
               });
           }
       }
   });
    $("#submit-file").click(function(){
        var url = null;
        var fileObj = $('#upload')
        if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(fileObj);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(fileObj);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(fileObj);
        }
        alert(url)
        // result = $.ajax({
        //     url: "http://"+addr+"/Upload",
        //     async: false,
        //     data: {
        //         dst: $("#recent_dir").html(),
        //         src:$('#upload').val()
        //     },
        //     type: "POST"
        // });
        // if(result.responseText=="true"){
        //     new PNotify({
        //         title: 'Success',
        //         text: '上传成功',
        //         type: 'success',
        //         styling: 'bootstrap3'
        //     });
        //     getDirList($("#recent_dir").html())
        // }else{
        //     new PNotify({
        //         title: 'Error',
        //         text: '上传失败',
        //         type: 'error',
        //         styling: 'bootstrap3'
        //     });
        // }
    })


    $("#back-to-last").click(function(){
        var dirs=$("#recent_dir").html().split("/")
        var str=""
        for(var i=0;i<dirs.length-2;i++){
            str = str+dirs[i]+"/";
        }
        $("#recent_dir").html(str)
        getDirList(str);
    });
    $(".delete").click(function(){
        var path=$("#recent_dir").html()+$(this).attr("name")
        result = $.ajax({
            url: "http://"+addr+"/Delete",
            async: false,
            data: {
                path: path
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
            getDirList($("#recent_dir").html())
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
    var dir = td.eq(1).text();
    if($(obj).parent().attr("name")=='folder'){
        $("#recent_dir").html($("#recent_dir").html()+dir+"/")
        getDirList($("#recent_dir").html())
    }
}

function clickDownload(obj){
    var td = $(obj).parents("tr").find("td");
    var filename = td.eq(1).text();
    alert(filename)
    result = $.ajax({
        url: "http://"+addr+"/Download",
        async: false,
        data: {
            path: $("#recent_dir").html()+filename,
            filename:filename
        },
        type: "POST"
    });
    if(result.responseText=="true"){
        new PNotify({
            title: 'Success',
            text: '下载成功',
            type: 'success',
            styling: 'bootstrap3'
        });
        getDirList($("#recent_dir").html())
    }else{
        new PNotify({
            title: 'Error',
            text: '下载失败',
            type: 'error',
            styling: 'bootstrap3'
        });
    }

}

function getDirList(dir){
    htmlobj=$.ajax({
        url:"http://"+addr+"/GetDirList",
        async:false,
        data:{
            dir:dir
        },
        type:"POST"
    });
    var i=0;
    var html=""
    $.each($.parseJSON(htmlobj.responseText), function(idx, obj) {
        if(i==0) {
            i = 1;
            var dir_list_str = ""
            if (obj.isDir == "true") {
                dir_list_str += "<tr class='even pointer' name='folder'>"
                dir_list_str += "<td style='width: 50px'><i class='fa fa-folder-o'></i></td>"
                dir_list_str+="<td onclick='tdClick(this)'>"+obj.name+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.modifyTime+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.size+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.permission+"</td>"+
                    "<td style='width:180px '>" +
                    "<button class='btn btn-danger btn-xs delete' name='"+obj.name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                    "</tr>"
            }
            else {
                dir_list_str += "<tr class='even pointer'>"
                dir_list_str += "<td style='width: 50px'><i class='fa fa-file-o'></i></td>"
                dir_list_str+="<td onclick='tdClick(this)'>"+obj.name+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.modifyTime+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.size+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.permission+"</td>"+
                    "<td style='width:180px '><a href='#' class='btn btn-primary btn-xs ' onclick='clickDownload(this)'><i class='fa fa-download'></i> Download</a>" +
                    "<button class='btn btn-danger btn-xs delete' name='"+obj.name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                    "</tr>"
            }

        }
        if(i==1) {
            i=0;
            var dir_list_str=""
            if(obj.isDir=="true") {
                dir_list_str += "<tr class='odd pointer ' name='folder'>"
                dir_list_str += "<td style='width: 50px'><i class='fa fa-folder-o'></i></td>"
                dir_list_str+="<td onclick='tdClick(this)'>"+obj.name+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.modifyTime+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.size+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.permission+"</td>"+
                    "<td style='width:180px'>" +
                    "<button class='btn btn-danger btn-xs delete' name='"+obj.name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                    "</tr>"
            }
            else {
                dir_list_str += "<tr class='even pointer'>"
                dir_list_str += "<td style='width: 50px'><i class='fa fa-file-o'></i></td>"
                dir_list_str+="<td onclick='tdClick(this)'>"+obj.name+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.modifyTime+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.size+"</td>"+
                    "<td onclick='tdClick(this)'>"+obj.permission+"</td>"+
                    "<td style='width:180px'><a href='#' class='btn btn-primary btn-xs ' onclick='clickDownload(this)'><i class='fa fa-download'></i> Download</a>" +
                    "<button class='btn btn-danger btn-xs delete' name='"+obj.name+"'><i class='fa fa-trash-o'></i> Delete </button></td>"+
                    "</tr>"
            }

        }
        html+=dir_list_str;
    });
    $("#dir_list").html(html)
}

function getDirListByVal(val,dir){
    var regExp=new RegExp(val)
    htmlobj=$.ajax({
        url:"http://"+addr+"/GetDirList",
        async:false,
        data:{
            dir:dir
        },
        type:"POST"
    });
    var i=0;
    var html=""
    $.each($.parseJSON(htmlobj.responseText), function(idx, obj) {
        if(regExp.test(JSON.stringify(obj))) {
            if (i == 0) {
                i = 1;
                var dir_list_str = ""
                if (obj.isDir == "true") {
                    dir_list_str += "<tr class='even pointer' name='folder'>"
                    dir_list_str += "<td style='width: 50px'><i class='fa fa-folder-o'></i></td>"
                    dir_list_str += "<td onclick='tdClick(this)'>" + obj.name + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.modifyTime + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.size + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.permission + "</td>" +
                        "<td style='width:180px '>" +
                        "<button class='btn btn-danger btn-xs delete' name='" + obj.name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                        "</tr>"
                }
                else {
                    dir_list_str += "<tr class='even pointer'>"
                    dir_list_str += "<td style='width: 50px'><i class='fa fa-file-o'></i></td>"
                    dir_list_str += "<td onclick='tdClick(this)'>" + obj.name + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.modifyTime + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.size + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.permission + "</td>" +
                        "<td style='width:180px '><a href='#' class='btn btn-primary btn-xs ' onclick='clickDownload(this)'><i class='fa fa-download'></i> Download</a>" +
                        "<button class='btn btn-danger btn-xs delete' name='" + obj.name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                        "</tr>"
                }

            }
            if (i == 1) {
                i = 0;
                var dir_list_str = ""
                if (obj.isDir == "true") {
                    dir_list_str += "<tr class='odd pointer ' name='folder'>"
                    dir_list_str += "<td style='width: 50px'><i class='fa fa-folder-o'></i></td>"
                    dir_list_str += "<td onclick='tdClick(this)'>" + obj.name + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.modifyTime + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.size + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.permission + "</td>" +
                        "<td style='width:180px'>" +
                        "<button class='btn btn-danger btn-xs delete' name='" + obj.name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                        "</tr>"
                }
                else {
                    dir_list_str += "<tr class='even pointer'>"
                    dir_list_str += "<td style='width: 50px'><i class='fa fa-file-o'></i></td>"
                    dir_list_str += "<td onclick='tdClick(this)'>" + obj.name + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.modifyTime + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.size + "</td>" +
                        "<td onclick='tdClick(this)'>" + obj.permission + "</td>" +
                        "<td style='width:180px'><a href='#' class='btn btn-primary btn-xs ' onclick='clickDownload(this)'><i class='fa fa-download'></i> Download</a>" +
                        "<button class='btn btn-danger btn-xs delete' name='" + obj.name + "'><i class='fa fa-trash-o'></i> Delete </button></td>" +
                        "</tr>"
                }

            }
            html += dir_list_str;
        }
    });
    $("#dir_list").html(html)
}