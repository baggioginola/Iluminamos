/**
 * Created by mario.cuevas on 5/11/2016.
 */
$(document).ready(function (){
    var url = (location.href).split('/');
    var listActive = url[url.length - 1];
    $('li').removeClass('active');
    if (listActive != '') {
        $(".nav-sidebar [href = '"+listActive+"']").parent().addClass('active');
    }
});