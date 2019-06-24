(function() {
    var form = $('.form');

    var emailInput = $('.form__input[name="email"]');
    emailInput.inputmask({ alias: 'email', jitMasking: true });
    var nameInput = $('.form__input[name="name"]');
    var commentInput = $('.form__textarea');
    var errors = $('.form__error');

    var success = $('.form__success');
    var successButton = $('.form__success-button');

    form.on('submit', function(e) {
        e.preventDefault();

        var isValidEmail = Inputmask.isValid(emailInput.val(), { alias: 'email' });
        var isValidName = nameInput.val().length >= 3 ? true : false;
        var isValidComment = commentInput.val().length >= 3 ? true : false;

        /** show errors if input value is incorrect */
        if (!isValidEmail) emailInput.next().show();
        if (!isValidName) nameInput.next().show();
        if (!isValidComment) commentInput.next().show();

        if (isValidEmail && isValidName && isValidComment) {
            errors.hide();
            var formData = form.serialize();

            $.ajax({
                url: '/',
                type: 'POST',
                data: formData,
                contentType: 'multipart/form-data',
                success: function(data) {
                    success.fadeIn(300).addClass('active');
                    emailInput.val('');
                    nameInput.val('');
                    commentInput.val('');
                },
                error: function(data) {
                    // alert(JSON.stringify(data));
                    success.fadeIn(300).addClass('active');
                    emailInput.val('');
                    nameInput.val('');
                    commentInput.val('');
                }
            });
        }
    });

    successButton.on('click', function() {
        success.fadeOut(300).removeClass('active');
    });
})();
