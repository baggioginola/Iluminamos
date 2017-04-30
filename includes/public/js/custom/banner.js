/**
 * Created by mario on 30/abr/2017.
 */
jQuery(document).ready(function () {
    banner(1200, 900, 'fill');
    banner(1200, 445, 'fill_bottom');

    window.onresize = function () {
        banner(1200, 900, 'fill');
        banner(1200, 445, 'fill_bottom');
    }
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