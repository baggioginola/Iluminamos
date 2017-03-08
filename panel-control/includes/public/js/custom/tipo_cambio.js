/**
 * Created by mario.cuevas on 5/12/2016.
 */
$(document).ready(function () {

    $('#reset_button').click(function () {
        $('#form_global').trigger("reset");
        $('#submit_type').val('tipo_cambio/add');
        $('#submit_id').val('');

        return false;
    });

    var url = 'tipo_cambio/getAll';
    var columns = [{data: 'moneda'},{data:'tipo_cambio'}];
    var table = masterDatatable(url, columns);

    $('#datatable tbody').on('click', '#btn_edit', function () {

        $("#form_alert").slideUp();
        var id = table.row($(this).parents('tr')).data().id_tipo_cambio;

        var data = {id_tipo_cambio: id};
        var url = 'tipo_cambio/getById';

        $('#submit_type').val('tipo_cambio/edit');

        $.post(url, data, function (response, status) {
            if (status == 'success') {
                $.each(response, function (key, val) {
                    $("input[name=" + key + "]").val(val);
                    $("textarea[name=" + key + "]").val(val);
                });
            }

            $('#submit_id').val(response.id_tipo_cambio);
        }, 'json');
        return false;
    });

    $('#datatable tbody').on('click', '#btn_delete', function () {
        var id = table.row($(this).parents('tr')).data().id_tipo_cambio;
        bootbox.confirm("Eliminar elemento?", function (result) {
            if (result == true) {
                var data = {id_tipo_cambio: id, status: 0};
                var url = 'tipo_cambio/delete';
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

        var data = $(this).serialize();

        if (type == 'tipo_cambio/edit') {
            var id = $('#submit_id').val();
            data = data + '&' + $.param({'id_tipo_cambio': id});
        }

        $.ajax({
            url: type,
            type: "POST",
            cache: false,
            data: data,
            dataType: 'json',
            async: false,
            success: function (data) {
                table.ajax.reload();
                submit_response_general(form, data, 'tipo_cambio/add');
            }
        });
        return false;
    });
});