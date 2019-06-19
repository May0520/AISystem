/**
 * Created by win10 on 2019/5/29.
 */
var username = $.cookie('username');
var addr = window.location.href.split("/")[2]
$(document).ready(function() {
    $("#welcome_word").html("Welcome," + username)
    $("#nav_user").html(username)
})