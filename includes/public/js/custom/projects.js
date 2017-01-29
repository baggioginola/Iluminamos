/**
 * Created by mario on 28/ene/2017.
 */
jQuery(document).ready(function () {
    jQuery(".projects").click(function () {
        var id = $(this).attr('id');

        var url = BASE_ROOT + 'projects/getImages';
        var images = [];
        jQuery.ajax({
            url: url,
            type: "POST",
            cache: false,
            data: {id_proyecto: id},
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.status == 200) {
                    for (var i = 1; i < response.data.num_imagenes; i++) {
                        var data_image = getImage(PROJECTS_IMG, id, i);
                        if (data_image.status == 200) {
                            var url = data_image.url;
                            images.push(url);
                        }
                    }
                }
            }
        });

        jQuery.fancybox(images, {
            'padding': 0,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'image',
            'changeFade': 0,
            'width': 600
        });
    });
});

function getImage(root_images, name, i) {
    var extension = '.jpg';
    var url = '';
    if (i == 1) {
        url = root_images + name + extension;
    }
    else {
        url = root_images + name + '_' + i + extension;
    }

    var exists = $.ajax({
        url: url,
        type: "POST",
        cache: false,
        dataType: 'json',
        async: false
    });

    if (exists.status != 200) {
        return {
            status: 404
        };
    }
    return {
        status: 200,
        url: url,
        extension: extension,
        name: name + '_' + i + extension
    };
}