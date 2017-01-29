/**
 * Created by mario on 28/ene/2017.
 */
jQuery(document).ready(function () {
    jQuery('.like').click(function () {
        var id = jQuery(this).attr('id');

        var url = BASE_ROOT + 'like/add';

        jQuery.ajax({
            url: url,
            type: "POST",
            cache: false,
            data: {id_producto: id},
            dataType: 'json',
            async: false,
            success: function (response) {
                location.href = BASE_ROOT + 'producto/' + id;
            }
        });
        return false;
    });
});