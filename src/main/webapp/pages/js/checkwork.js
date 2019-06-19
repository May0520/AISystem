/**
 * Created by win10 on 2019/5/27.
 */
var username = $.cookie('username');
$(document).ready(function() {
    // $('.ui-pnotify-container').hide();
    $("#welcome_word").html("Welcome," + username)
    $("#nav_user").html(username)
});

