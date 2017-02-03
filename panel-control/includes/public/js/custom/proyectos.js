/**
 * Created by mario.cuevas on 7/6/2016.
 */
$(document).ready(function () {
    tinymce.init({
        selector: "textarea#id_contenido",
        menubar: "edit",

        theme: "modern",
        toolbar: " undo redo |  bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link",
        plugins: [
            "advlist autolink link image lists charmap hr anchor pagebreak spellchecker",
            "searchreplace visualblocks visualchars  fullscreen insertdatetime  nonbreaking",
            "save table contextmenu directionality template paste "
        ]

    });
    $('#id_fecha').datepicker();

    $("#id_imagen").fileinput({
        uploadUrl: "imagenes/add",
        allowedFileExtensions: ["jpg"],
        maxFileCount: 10,
        minFileCount: 1,
        uploadAsync: false,
        language: "es",
        showUpload: false,
        fileActionSettings: {showUpload: false, showZoom: false},
        previewSettings: {image: {width: "auto", height: "100px"}},
        purifyHtml: true,
        autoReplace: true,
        uploadExtraData: function (previewId, index) {
            var info = {
                "type": "proyectos",
                "name": $("#id_nombre").val(),
                'num_imagenes': $('.file-initial-thumbs > div').length + $('.file-live-thumbs > div').length
            };
            return info;
        }
    }).on('filebatchuploadsuccess', function (event, data) {
        var out = '';
    }).on('fileloaded', function (event, file, previewId, index, reader) {
        $('#upload_images').val('1');
    });

    $('#reset_button').click(function () {
        $("#id_imagen").fileinput("refresh");
        $('#form_global').trigger("reset");
        $('#submit_type').val('proyectos/add');
        $('#submit_id').val('');

        return false;
    });


    var url = 'proyectos/getAll';
    var columns = [{data: 'titulo'}, {data: 'subtitulo'}, {data: 'fecha'}];

    var table = masterDatatable(url, columns);

    $('#datatable tbody').on('click', '#btn_edit', function () {
        $("#form_alert").slideUp();
        var id = table.row($(this).parents('tr')).data().id_caso_exito;

        var data = {id_caso_exito: id};
        var url = 'proyectos/getById';

        $('#submit_type').val('proyectos/edit');

        $.post(url, data, function (response, status) {
            if (status == 'success') {
                $.each(response, function (key, val) {
                    if (key == 'contenido') {
                        tinyMCE.get('id_contenido').setContent(val);
                    }
                    $("textarea[name=" + key + "]").val(val);
                    $("input[name=" + key + "]").val(val);
                    $("select[name=" + key + "]").val(val);
                });
                var images = [];
                var initialPreviewConfigObj = [];

                for (var i = 1; i < response.num_imagenes; i++) {
                    var dataImage = getImage(IMAGES_PROJECTS, response.id_caso_exito, i);
                    if (dataImage.status == 200) {
                        images[i] = '<img src="' + dataImage.url + '" class="file-preview-image" alt="Desert" title="Desert" style="width:auto; height:100px;">';

                        var initialPreviewConfigItem = {};
                        initialPreviewConfigItem['caption'] = dataImage.name;
                        initialPreviewConfigItem['key'] = i;
                        initialPreviewConfigObj.push(initialPreviewConfigItem);
                    }
                }

                $('#id_imagen').fileinput('refresh', {
                    uploadUrl: "imagenes/edit",
                    initialPreview: images,
                    initialPreviewFileType: 'image',
                    initialPreviewShowDelete: false,
                    initialPreviewConfig: initialPreviewConfigObj,
                    validateInitialCount: true,
                    fileActionSettings: {showDrag: false},
                    append: true,
                    showUploadedThumbs: false,
                    uploadExtraData: function (previewId, index) {
                        var info = {
                            "type": "proyectos",
                            "name": $("#id_nombre").val(),
                            "categoria": $("#id_categoria").val(),
                            "key_nombre": $('#key_nombre').val()
                        };
                        return info;
                    }
                });


                $('#upload_images').val('0');
            }
            $('#submit_id').val(response.id);
        }, 'json');
        return false;
    });

    $('#datatable tbody').on('click', '#btn_delete', function () {
        var id = table.row($(this).parents('tr')).data().id_caso_exito;
        bootbox.confirm("Eliminar elemento?", function (result) {
            if (result == true) {
                var data = {id_caso_exito: id, status: 0};
                var url = 'proyectos/delete';

                $.post(url, data, function (response, status) {
                    if (status == 'success') {
                        bootbox.alert(response.message);
                        table.ajax.reload();
                    }
                }, 'json');
            }
        });
        return false;
    });

    var form = $('#form_global').submit(function () {
        if ($('#id_submit').hasClass('disabled')) {
            return false;
        }

        var type = $('#submit_type').val();

        if ($('#id_imagen').fileinput('upload') == null && $('#upload_images').val() == 1) {
            return false;
        }

        var live_count = $('.file-initial-thumbs > div').length;
        var initial_count = $('.file-live-thumbs > div').length;

        var fileStack = live_count + initial_count;

        var data = $(this).serialize();

        if (type == 'proyectos/edit') {
            var id = $('#submit_id').val();
            data = data + '&' + $.param({'id_caso_exito': id});

            if ($('#upload_images').val() == 0) {
                var info = {
                    "type": "proyectos",
                    "name": $("#id_nombre").val(),
                    "categoria": $("#id_categoria").val(),
                    key_nombre: $('#key_nombre').val()
                };
                var url_edit = 'dir/update';
                $.ajax({
                    url: url_edit,
                    type: "POST",
                    cache: false,
                    data: info,
                    dataType: 'json',
                    async: true,
                    success: function (response) {
                    }
                });
            }
        }

        data = data + '&' + $.param({'num_imagenes': fileStack}) + '&' + $.param({'contenido': tinyMCE.get('id_contenido').getContent()});

        $.ajax({
            url: type,
            type: "POST",
            cache: false,
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 200) {
                    table.ajax.reload();
                    submit_response(form, data, 'proyectos/add');
                }
                else {
                    bootbox.alert(data.message);
                }
            }
        });
        return false;
    });
});