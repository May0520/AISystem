/**
 * Created by win10 on 2019/5/18.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
$(document).ready(function(){
    $('#course').html(decodeURI(window.location.href.split("#")[1]))
    $('.ui-pnotify-container').hide();
    $("#welcome_word").html("Welcome,"+username)
    $("#nav_user").html(username)
    getHomeworkList($('#course').html())
    $('#search-btn').click(function () {
        var val = $('#search').val()
        getHomeworkListByVal(val,$('#course').html())
    })
    $('#submit').click(function(){
        var course = $('#course').html()
        var title = $('#input-title').val()
        var content = $('#editor-one').html()
        result = $.ajax({
            url: "http://"+addr+"/SaveFile",
            async: false,
            data: {
                dir: "/user/aiSystemUser/"+username+"/course/"+course+"/",
                title:title,
                content:content
            },
            type: "POST"
        });
        if(result.responseText=="true"){
            $(".modal-backdrop").css("display", "none")
            $(".modal").css("display", "none")
            new PNotify({
                title: 'Success',
                text: '创建成功',
                type: 'success',
                styling: 'bootstrap3'
            });
            getHomeworkList($('#course').html())
        }else{
            new PNotify({
                title: 'Error',
                text: '创建失败',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
})

function getHomeworkList(course) {
    var dir = "/user/aiSystemUser/"+username+"/course/"+course+"/";
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
        str+='<tr> <td>'+num+'</td>'+
            '<td>'+name+'</td>'+
            '<td>'+modifyTime+'</td>'+
            '<td>'+
            '<button type="button" class="btn btn-info btn-xs edit" onclick="editHomework(this)" data-toggle="modal" data-target=".editor'+num+'" id="editor'+num+'"><i class="fa fa-pencil"></i> Edit </button> '+
            '<div class="modal fade editor'+num+'" tabindex="-1" role="dialog" aria-hidden="true">'+
            '  <div class="modal-dialog modal-lg">'+
            '    <div class="modal-content">'+
            '      <div class="modal-header">'+
            '        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>'+
            '        </button>'+
            '        <h4 class="modal-title" id="myModalLabel">修改</h4>'+
            '      </div>'+
            '      <div class="modal-body">'+
            '        <form class="form-horizontal form-label-left">'+
            '          <div class="form-group">'+
            '            <label class="control-label col-md-3 col-sm-3 col-xs-12">标&nbsp&nbsp题</label>'+
            '            <div class="col-md-9 col-sm-9 col-xs-12">'+
            '              <input type="text" class="form-control" id="input-title-'+num+'" value="'+name+'">'+
            '            </div>'+
            '          </div>'+
            '            <div class="form-group">'+
            '              <div id="alerts"></div>'+
            '              <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor-text-'+num+'">'+
            '                <div class="btn-group">'+
            '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>'+
            '                  <ul class="dropdown-menu">'+
            '                  </ul>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>'+
            '                  <ul class="dropdown-menu">'+
            '                    <li>'+
            '                      <a data-edit="fontSize 5">'+
            '                        <p style="font-size:17px">Huge</p>'+
            '                      </a>'+
            '                    </li>'+
            '                    <li>'+
            '                      <a data-edit="fontSize 3">'+
            '                        <p style="font-size:14px">Normal</p>'+
            '                      </a>'+
            '                    </li>'+
            '                    <li>'+
            '                      <a data-edit="fontSize 1">'+
            '                        <p style="font-size:11px">Small</p>'+
            '                      </a>'+
            '                    </li>'+
            '                  </ul>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>'+
            '                  <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>'+
            '                  <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="fa fa-strikethrough"></i></a>'+
            '                  <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>'+
            '                  <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>'+
            '                  <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="fa fa-dedent"></i></a>'+
            '                  <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>'+
            '                  <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>'+
            '                  <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>'+
            '                  <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="fa fa-link"></i></a>'+
            '                  <div class="dropdown-menu input-append">'+
            '                    <input class="span2" placeholder="URL" type="text" data-edit="createLink" />'+
            '                    <button class="btn" type="button">Add</button>'+
            '                  </div>'+
            '                  <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-cut"></i></a>'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>'+
            '                  <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />'+
            '                </div>'+
            '                <div class="btn-group">'+
            '                  <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>'+
            '                  <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>'+
            '                </div>'+
            '              </div>'+
            '              <div id="editor-text-'+num+'" class="editor-wrapper placeholderText" contenteditable="true" style="overflow: scroll;height:350px"></div>'+
            '              <textarea name="descr" id="descr-'+num+'" style="display:none;"></textarea>'+
            '            </div>'+
            '        </form>'+
            '      </div>'+
            '      <div class="modal-footer">'+
            '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '        <button type="button" class="btn btn-primary" id="submit-'+num+'" onclick="changeHomework(this)">提交</button>'+
            '      </div>'+
            '    </div>'+
            '  </div>'+
            '</div>'+
            '<button class="btn btn-danger btn-xs " onclick="deleteHomework(this)"><i class="fa fa-trash-o"></i> Delete </button>'+
            '</td> </tr>'
        html+=str;
        num+=1;
    });
    $("#homework_list").html(html)
}

function getHomeworkListByVal(val,course) {
    var regExp=new RegExp(val)
    var dir = "/user/aiSystemUser/"+username+"/course/"+course+"/";
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
        if(regExp.test(JSON.stringify(obj))) {
            str += '<tr> <td>' + num + '</td>' +
                '<td>' + name + '</td>' +
                '<td>' + modifyTime + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-info btn-xs edit" onclick="editHomework(this)" data-toggle="modal" data-target=".editor' + num + '" id="editor' + num + '"><i class="fa fa-pencil"></i> Edit </button> ' +
                '<div class="modal fade editor' + num + '" tabindex="-1" role="dialog" aria-hidden="true">' +
                '  <div class="modal-dialog modal-lg">' +
                '    <div class="modal-content">' +
                '      <div class="modal-header">' +
                '        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>' +
                '        </button>' +
                '        <h4 class="modal-title" id="myModalLabel">修改</h4>' +
                '      </div>' +
                '      <div class="modal-body">' +
                '        <form class="form-horizontal form-label-left">' +
                '          <div class="form-group">' +
                '            <label class="control-label col-md-3 col-sm-3 col-xs-12">标&nbsp&nbsp题</label>' +
                '            <div class="col-md-9 col-sm-9 col-xs-12">' +
                '              <input type="text" class="form-control" id="input-title-' + num + '" value="' + name + '">' +
                '            </div>' +
                '          </div>' +
                '            <div class="form-group">' +
                '              <div id="alerts"></div>' +
                '              <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor-text-' + num + '">' +
                '                <div class="btn-group">' +
                '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>' +
                '                  <ul class="dropdown-menu">' +
                '                  </ul>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>' +
                '                  <ul class="dropdown-menu">' +
                '                    <li>' +
                '                      <a data-edit="fontSize 5">' +
                '                        <p style="font-size:17px">Huge</p>' +
                '                      </a>' +
                '                    </li>' +
                '                    <li>' +
                '                      <a data-edit="fontSize 3">' +
                '                        <p style="font-size:14px">Normal</p>' +
                '                      </a>' +
                '                    </li>' +
                '                    <li>' +
                '                      <a data-edit="fontSize 1">' +
                '                        <p style="font-size:11px">Small</p>' +
                '                      </a>' +
                '                    </li>' +
                '                  </ul>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>' +
                '                  <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>' +
                '                  <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="fa fa-strikethrough"></i></a>' +
                '                  <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>' +
                '                  <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>' +
                '                  <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="fa fa-dedent"></i></a>' +
                '                  <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>' +
                '                  <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>' +
                '                  <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>' +
                '                  <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="fa fa-link"></i></a>' +
                '                  <div class="dropdown-menu input-append">' +
                '                    <input class="span2" placeholder="URL" type="text" data-edit="createLink" />' +
                '                    <button class="btn" type="button">Add</button>' +
                '                  </div>' +
                '                  <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-cut"></i></a>' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>' +
                '                  <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />' +
                '                </div>' +
                '                <div class="btn-group">' +
                '                  <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>' +
                '                  <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>' +
                '                </div>' +
                '              </div>' +
                '              <div id="editor-text-' + num + '" class="editor-wrapper placeholderText" contenteditable="true" style="overflow: scroll;height:350px"></div>' +
                '              <textarea name="descr" id="descr-' + num + '" style="display:none;"></textarea>' +
                '            </div>' +
                '        </form>' +
                '      </div>' +
                '      <div class="modal-footer">' +
                '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                '        <button type="button" class="btn btn-primary" id="submit-' + num + '" onclick="changeHomework(this)">提交</button>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>' +
                '<button class="btn btn-danger btn-xs " onclick="deleteHomework(this)"><i class="fa fa-trash-o"></i> Delete </button>' +
                '</td> </tr>'
            html += str;
            num += 1;
        }
    });
    $("#homework_list").html(html)
}

function changeHomework(obj){
    var num = $(obj).attr("id").split("-")[1]
    var course = $('#course').html()
    var old_title = $(obj).parents("tr").find("td").eq(1).text().trim();
    var new_title = $('#input-title-'+num).val()
    var content = $('#editor-text-'+num).html()
    result = $.ajax({
        url: "http://"+addr+"/ChangeCourseDetail",
        async: false,
        data: {
            dir: "/user/aiSystemUser/"+username+"/course/"+course+"/",
            old_title:old_title,
            new_title:new_title,
            content:content
        },
        type: "POST"
    });
    if(result.responseText=="true"){
        $(".modal-backdrop").css("display", "none")
        $(".modal").css("display", "none")
        new PNotify({
            title: 'Success',
            text: '修改成功',
            type: 'success',
            styling: 'bootstrap3'
        });
        getHomeworkList($('#course').html())
    }else{
        new PNotify({
            title: 'Error',
            text: '修改失败',
            type: 'error',
            styling: 'bootstrap3'
        });
    }



}
function editHomework(obj){
    var td = $(obj).parent().parent().find("td");
    var num = td.eq(0).text().trim();
    var name = td.eq(1).text().trim();
    var path="/user/aiSystemUser/"+username+"/course/"+$('#course').html()+"/"+name+".txt"
    result = $.ajax({
        url: "http://"+addr+"/GetCourseDetailContent",
        async: false,
        data: {
            path: path
        },
        type: "POST"
    });
    var content = result.responseText
    $('#editor-text-'+num).html(content)
}

function deleteHomework(obj){
    var td = $(obj).parent().parent().find("td");
    var name = td.eq(1).text().trim();
    var path="/user/aiSystemUser/"+username+"/course/"+$('#course').html()+"/"+name+".txt"
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
        getHomeworkList($('#course').html())
    }else{
        new PNotify({
            title: 'Error',
            text: '删除失败',
            type: 'error',
            styling: 'bootstrap3'
        });
    }
}