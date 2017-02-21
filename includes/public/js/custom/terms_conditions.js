/**
 * Created by mario on 27/ene/2017.
 */
jQuery(document).ready(function () {
    var terms_conditions = jQuery('#terms_conditions').click(function () {
        if($('#terms_conditions_agree').prop('checked')){
            location.href = BASE_ROOT + 'pago';
        }
        else {
            bootbox.alert('Debe aceptar los términos y condiciones');
        }
        return false;
    });
});