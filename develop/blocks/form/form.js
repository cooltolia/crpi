(function() {
    var Email = {
        send: function(a) {
            return new Promise(function(n, e) {
                (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send');
                var t = JSON.stringify(a);
                Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function(e) {
                    n(e);
                });
            });
        },
        ajaxPost: function(e, n, t) {
            var a = Email.createCORSRequest('POST', e);
            a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
                (a.onload = function() {
                    var e = a.responseText;
                    null != t && t(e);
                }),
                a.send(n);
        },
        ajax: function(e, n) {
            var t = Email.createCORSRequest('GET', e);
            (t.onload = function() {
                var e = t.responseText;
                null != n && n(e);
            }),
                t.send();
        },
        createCORSRequest: function(e, n) {
            var t = new XMLHttpRequest();
            return (
                'withCredentials' in t
                    ? t.open(e, n, !0)
                    : 'undefined' != typeof XDomainRequest
                    ? (t = new XDomainRequest()).open(e, n)
                    : (t = null),
                t
            );
        }
    };

    var form = $('.form');

    var emailInput = $('.form__input[name="email"]');
    emailInput.inputmask({ alias: 'email', jitMasking: true });
    var nameInput = $('.form__input[name="name"]');
    var commentInput = $('.form__textarea');
    var errors = $('.form__error');

    var success = $('.form__success');
    var successButton = $('.form__success-button');

    var isValidEmail = function() {
        return Inputmask.isValid(emailInput.val(), { alias: 'email' });
    };
    var isValidName = function() {
        return nameInput.val().length >= 3 ? true : false;
    };
    var isValidComment = function() {
        return commentInput.val().length >= 3 ? true : false;
    };

    /** hide errors dynamically */
    emailInput.on('input', function() {
        if (isValidEmail()) emailInput.next().hide();
    });
    nameInput.on('input', function() {
        if (isValidName()) nameInput.next().hide();
    });
    commentInput.on('input', function() {
        if (isValidComment()) commentInput.next().hide();
    });

    form.on('submit', function(e) {
        e.preventDefault();

        var antispam = $('input.agreeCheckbox');

        /** show errors if input value is incorrect */
        if (!isValidEmail()) emailInput.next().show();
        if (!isValidName()) nameInput.next().show();
        if (!isValidComment()) commentInput.next().show();

        if (antispam.prop('checked') == true) {
            console.log('spamer ;(');
            return;
        }

        if (isValidEmail() && isValidName() && isValidComment()) {
            errors.hide();
            var body =
                'Имя: ' + nameInput.val() + '; E-mail: ' + emailInput.val() + '; Комментарий: ' + commentInput.val();

            emailInput.val('');
            nameInput.val('');
            commentInput.val('');

            Email.send({
                SecureToken: '189816d4-5060-4120-ab59-10bc81d7ee1e',
                To: 'abd.oybek@gmail.com',
                From: 'abd.oybek@gmail.com',
                Subject: 'Заявка с сайта ЦРПИ',
                Body: body
            }).then(function(e) {
                console.log(e);

                success.fadeIn(300).addClass('active');
            });
        }
    });

    successButton.on('click', function() {
        success.fadeOut(300).removeClass('active');
    });
})();
