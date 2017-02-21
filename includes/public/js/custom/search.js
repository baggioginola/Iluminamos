/**
 * Created by mario on 15/ene/2017.
 */
jQuery(document).ready(function () {
    jQuery('#btn_search_products').click(function () {
        jQuery('#id_message_search').slideUp();
        var url = BASE_ROOT + 'search/products';

        var filters = {};

        if (jQuery('#filter_category').val() != '') {
            filters['category'] = jQuery('#filter_category').val();
        }
        if (jQuery('#filter_brand').val() != '') {
            filters['brand'] = jQuery('#filter_brand').val();
        }
        if (jQuery('#filter_price').val() != '') {
            filters['price'] = jQuery('#filter_price').val();
        }

        if (Object.keys(filters).length === 0) {
            jQuery('#id_message_search').slideDown();
            return false;
        }

        jQuery.ajax({
            url: url,
            type: "POST",
            cache: false,
            data: filters,
            dataType: 'json',
            async: false,
            success: function (response) {
                var product_results = jQuery('#product_results');
                product_results.empty();
                product_results.slideUp();
                if (response.status == 200) {
                    var product_results_array = [];
                    jQuery.each(response.data, function (key, value) {

                        product_results_array = [
                            '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">' +
                            '<a href="', BASE_ROOT + 'producto/' + value.id_producto, '" class="products_thumbnail">' +
                            '<div class="thumbnail"><img src="', value.url_image , '"/>' +
                            '<label>', value.nombre, '</label>' +
                            '</div>' +
                            '</a>' +
                            '</div>'];
                        product_results.append(product_results_array.join(''));
                    });
                    product_results.slideDown();
                }
                else {
                    bootbox.alert('No se encontraron resultados');
                    product_results_array = [
                        '<h3>NO SE ENCONTRARON RESULTADOS</h3>'];
                    product_results.append(product_results_array.join(''));
                    product_results.slideDown();
                }
            }
        });
    });
});