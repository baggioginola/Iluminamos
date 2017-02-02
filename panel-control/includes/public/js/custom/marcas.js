/**
 * Created by mario.cuevas on 5/12/2016.
 */
$(document).ready(function () {

    $('#reset_button').click(function () {
        $('#form_global').trigger("reset");
        $('#submit_type').val('marcas/add');
        $('#submit_id').val('');

        return false;
    });

    var url = 'marcas/getAll';
    var columns = [{data: 'nombre'},{data:'descuento'}];
    var table = masterDatatable(url, columns);

    $('#datatable tbody').on('click', '#btn_edit', function () {

        $("#form_alert").slideUp();
        var id = table.row($(this).parents('tr')).data().id_marca;

        var data = {id_marca: id};
        var url = 'marcas/getById';

        $('#submit_type').val('marcas/edit');

        $.post(url, data, function (response, status) {
            if (status == 'success') {
                $.each(response, function (key, val) {
                    $("input[name=" + key + "]").val(val);
                    $("textarea[name=" + key + "]").val(val);
                });
            }

            $('#submit_id').val(response.id_marca);
        }, 'json');
        return false;
    });

    $('#datatable tbody').on('click', '#btn_delete', function () {
        var id = table.row($(this).parents('tr')).data().id_marca;
        bootbox.confirm("Eliminar elemento?", function (result) {
            if (result == true) {
                var data = {id_marca: id, status: 0};
                var url = 'marcas/delete';
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

        if (type == 'marcas/edit') {
            var id = $('#submit_id').val();
            data = data + '&' + $.param({'id_marca': id});
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
                submit_response_general(form, data, 'marcas/add');
            }
        });
        return false;
    });
});