(function ($) {
    "use strict";

    $(document).ready(function () {
        var confirmDialog = $('#confirmModal ');

        confirmDialog.on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                href = button.data('href'),
                content = button.data('content'),
                title = button.data('title'),
                form = button.data('form'),
                confirm = button.data('confirm'),
                modal = $(this),
                $confirmAction = $('#confirmModalAction', modal);

            $confirmAction.attr('href', href);
            if (form) {
                $confirmAction.data('form', form);
            }
            //$('.modal-body', modal).html(content);
            if (title) {
                $('#confirmModalLabel', modal).html(title);
            }
            if (confirm) {
                $confirmAction.html(confirm);
            }
        });
        confirmDialog.on('click', '#confirmModalAction', function (e) {
            var href = $(this);
            var form = $(this).data('form');
            if (href.data('clicked')) {
                e.stopPropagation();
                return false;
            }
            href.data('clicked', 1);
            if (form) {
                $(form).submit();
            }
        });
    });

})(jQuery);
