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
        var antispam = $('input.agreeCheckbox');

        /** show errors if input value is incorrect */
        if (!isValidEmail) emailInput.next().show();
        if (!isValidName) nameInput.next().show();
        if (!isValidComment) commentInput.next().show();

        if (antispam.prop('checked') == true) {
            console.log('spamer ;(');
            return;
        }

        if (isValidEmail && isValidName && isValidComment) {
            errors.hide();
            var body =
                'Имя: ' + nameInput.val() + '; E-mail: ' + emailInput.val() + '; Комментарий: ' + commentInput.val();

            Email.send({
                SecureToken: 'f59d2754-0d65-4c78-93e4-d260c4fc8d70',
                To: 'cooltolia@gmail.com',
                From: 'cooltolia@gmail.com',
                Subject: 'Заявка с сайта ЦРПИ',
                Body: body
            }).then(function() {
                success.fadeIn(300).addClass('active');
                emailInput.val('');
                nameInput.val('');
                commentInput.val('');
            });
        }
    });

    successButton.on('click', function() {
        success.fadeOut(300).removeClass('active');
    });
})();
