/**
 * Created by mario on 08/ene/2017.
 */
jQuery(document).ready(function () {
    jQuery('#limenu_1 a').mouseenter(function () {
        jQuery('#dd-area1').stop(true, true).delay(0).slideDown('medium');
    });

    jQuery("#limenu_1").mouseleave(function () {
        jQuery('#dd-area1').stop(true, true).delay(0).slideUp('medium');
    });

    jQuery('#limenu_2 a').mouseenter(function () {
        jQuery('#dd-area2').stop(true, true).delay(0).slideDown('medium');
    });

    jQuery("#limenu_2").mouseleave(function () {
        jQuery('#dd-area2').stop(true, true).delay(0).slideUp('medium');
    });


    //evento clic de la flecha izquierda
    jQuery('.divIzquierda').click(function () {
        jQuery('.thumbs_list ul').prepend(jQuery('.thumbs_list ul li:last'));
    });

    //evento clic de la flecha derecha
    jQuery('.divDerecha').click(function () {
        jQuery('.thumbs_list ul').append(jQuery('.thumbs_list ul li:first'));
    });


    //evento clic de la flecha izquierda
    jQuery('.divIzquierda_exterior').click(function () {
        jQuery('.thumbs_list_exterior ul').prepend(jQuery('.thumbs_list_exterior ul li:last'));
    });

    //evento clic de la flecha derecha
    jQuery('.divDerecha_exterior').click(function () {
        jQuery('.thumbs_list_exterior ul').append(jQuery('.thumbs_list_exterior ul li:first'));
    });
});