/**
 * Created by mario on 08/ene/2017.
 */
jQuery(document).ready(function(){
    jQuery('#limenu_1 a').mouseenter(function () {
        jQuery('#dd-area1').stop(true, true).delay(0).slideDown('medium');
    });

    jQuery("#limenu_1").mouseleave(function () {
        jQuery('#dd-area1').stop(true, true).delay(0).slideUp('medium');
    });
});