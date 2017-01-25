/**
 * Created by mario on 19/ene/2017.
 */
jQuery(document).ready(function () {
    jQuery('#reset_button').click(function () {
        jQuery('#form_register').trigger("reset");

        return false;
    });

    var form = jQuery('#form_register').submit(function () {
        var pw = jQuery('#id_password').val();
        pw = hex_md5(pw);
        var data = jQuery(this).serialize() + '&' + jQuery.param({'password': pw});
        var url = BASE_ROOT + 'register/add';
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                form.trigger("reset");
                bootbox.alert('Gracias por registrarse');
            }
        });
        return false;
    });
});