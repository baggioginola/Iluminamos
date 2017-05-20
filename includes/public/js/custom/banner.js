/**
 * Created by mario on 30/abr/2017.
 */
jQuery(document).ready(function () {
    banner(1200, 900, 'fill');
    banner(1200, 445, 'fill_bottom');

    window.onresize = function () {
        banner(1200, 900, 'fill');
        banner(1200, 445, 'fill_bottom');
    };

    var url = BASE_ROOT + 'banner/load';

    jQuery.ajax({
        url: url,
        type: "POST",
        cache: false,
        data: {},
        dataType: 'json',
        async: false,
        success: function (response) {
            console.log(response);
            if (response.status === 200) {
                jQuery.each(response.data.main, function (key, value) {
                    var img = new Image();
                    img.src = value;
                });
                jQuery.each(response.data.brands, function (key, value) {
                    var img = new Image();
                    img.src = value;
                });
                jQuery.each(response.data.top, function (key, value) {
                    var img = new Image();
                    img.src = value;
                });
            }
        }
    });
    return false;
});

function banner(width_ratio, height_ratio, _class) {
    var ratio = width_ratio / height_ratio;
    var div = jQuery('.' + _class);

    var width = div.width();

    var height = width / ratio;

    div.css('height', height + 'px');

    if (_class == 'fill_bottom') {
        jQuery('.banner-right-top').css('height', height + 'px');
        jQuery('.banner-right-bottom').css('height', height + 'px');
    }
}

function carousel(height) {
    var ratio = 1.1607;

    console.log(height);
    var top = height * ratio;

    jQuery('.carousel-indicators').css('top', top + 'px');
}

function preload(imageArray, index) {
    index = index || 0;
    if (imageArray && imageArray.length > index) {
        var img = new Image();
        img.onload = function () {
            preload(imageArray, index);
        };
        img.src = images[index]['serving_url'];
    }
}