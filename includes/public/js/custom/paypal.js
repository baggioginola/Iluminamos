/**
 * Created by mario on 26/ene/2017.
 */
jQuery(document).ready(function () {
    var form = jQuery('#id_paypal').click(function () {
        var url = BASE_ROOT + 'paypal/pay';

        var data = {};
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if(response.status == 200) {
                    window.location = response.data.result;
                }
            }
        });
        return false;
    });
});