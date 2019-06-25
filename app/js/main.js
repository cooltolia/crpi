$.noConflict();
jQuery(document).ready(function($) {
    $('body').removeClass('pageload');

    // isMobile detect
    !(function(e) {
        var n = /iPhone/i,
            t = /iPod/i,
            r = /iPad/i,
            a = /\bAndroid(?:.+)Mobile\b/i,
            p = /Android/i,
            b = /\bAndroid(?:.+)SD4930UR\b/i,
            l = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
            f = /Windows Phone/i,
            s = /\bWindows(?:.+)ARM\b/i,
            u = /BlackBerry/i,
            c = /BB10/i,
            h = /Opera Mini/i,
            v = /\b(CriOS|Chrome)(?:.+)Mobile/i,
            w = /Mobile(?:.+)Firefox\b/i;
        function m(e, i) {
            return e.test(i);
        }
        function i(e) {
            var i = e || ('undefined' != typeof navigator ? navigator.userAgent : ''),
                o = i.split('[FBAN');
            void 0 !== o[1] && (i = o[0]), void 0 !== (o = i.split('Twitter'))[1] && (i = o[0]);
            var d = {
                apple: {
                    phone: m(n, i) && !m(f, i),
                    ipod: m(t, i),
                    tablet: !m(n, i) && m(r, i) && !m(f, i),
                    device: (m(n, i) || m(t, i) || m(r, i)) && !m(f, i)
                },
                amazon: { phone: m(b, i), tablet: !m(b, i) && m(l, i), device: m(b, i) || m(l, i) },
                android: {
                    phone: (!m(f, i) && m(b, i)) || (!m(f, i) && m(a, i)),
                    tablet: !m(f, i) && !m(b, i) && !m(a, i) && (m(l, i) || m(p, i)),
                    device: (!m(f, i) && (m(b, i) || m(l, i) || m(a, i) || m(p, i))) || m(/\bokhttp\b/i, i)
                },
                windows: { phone: m(f, i), tablet: m(s, i), device: m(f, i) || m(s, i) },
                other: {
                    blackberry: m(u, i),
                    blackberry10: m(c, i),
                    opera: m(h, i),
                    firefox: m(w, i),
                    chrome: m(v, i),
                    device: m(u, i) || m(c, i) || m(h, i) || m(w, i) || m(v, i)
                }
            };
            return (
                (d.any = d.apple.device || d.android.device || d.windows.device || d.other.device),
                (d.phone = d.apple.phone || d.android.phone || d.windows.phone),
                (d.tablet = d.apple.tablet || d.android.tablet || d.windows.tablet),
                d
            );
        }
        'undefined' != typeof module && module.exports && 'undefined' == typeof window
            ? (module.exports = i)
            : 'undefined' != typeof module && module.exports && 'undefined' != typeof window
            ? ((module.exports = i()), (module.exports.isMobile = i))
            : 'function' == typeof define && define.amd
            ? define([], (e.isMobile = i()))
            : (e.isMobile = i());
    })(this);

    const isMobile = this.isMobile;

    

    
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

    

    
    

    
    

    
    (function() {

        var slider = $('.investment__list');

        var lang = $('html').attr('lang');

    

        slider.slick({

            slidesToShow: 1.17,

            slidesToScroll: 1,

            arrows: false,

            infinite: false,

            mobileFirst: true,

            infinite: true,

            responsive: [

                {

                    breakpoint: 1279,

                    settings: {

                        arrows: true,

                        slidesToShow: 1.1

                    }

                }

            ]

        });

    

        var showMoreLink = $('.investment__more-link');

        showMoreLink.on('click', function(e) {

            e.preventDefault();

            var _this = $(this);

    

            var text = _this.prev();

            var hidden = text.find('.more');

    

            if (_this.hasClass('active')) {

                _this.removeClass('active');

                hidden.hide();

    

                lang === 'ru' ? _this.text('Развернуть') : _this.text('More');

            } else {

                _this.addClass('active');

                hidden.show().css('display', 'inline');

                

                lang === 'ru' ? _this.text('Скрыть') : _this.text('Hide');

            }

        });

    })();

    

    
    (function() {

        var zoom = 16;

        var address = [55.780583, 37.590677];

        var center = [55.780583, 37.590677];

    

        if ($(window).width() > 1280) {

            zoom = 17;

            center = [55.780761, 37.593976];

        }

    

        ymaps.ready(function() {

            var myMap;

    

            myMap = new ymaps.Map('map', {

                center: center,

                zoom: zoom,

                controls: ['zoomControl']

            });

            var squareLayout = ymaps.templateLayoutFactory.createClass('<div id="customPlacemark" class=""></div>');

            var myPlacemark = new ymaps.Placemark(

                address,

                {

                    hintContent: 'г. Москва, ул. Лесная, д. 43',

                    balloonContent: 'г. Москва, ул. Лесная, д. 43'

                },

                {

                    iconLayout: squareLayout,

                    iconShape: {

                        type: 'Rectangle',

                        coordinates: [[-20, -30], [20, 30]]

                    },

                    iconOffset: [0, -30]

                }

            );

            myPlacemark.events.add('mouseenter', function() {

                $('#customPlacemark').addClass('custom-placemark-hover');

            });

            myPlacemark.events.add('mouseleave', function() {

                $('#customPlacemark').removeClass('custom-placemark-hover');

            });

    

            myMap.geoObjects.add(myPlacemark);

            myMap.behaviors.disable('scrollZoom');

    

            if (isMobile.phone) myMap.behaviors.disable('drag');

        });

    })();

    

    
    

    
    

    
    (function() {

        var block = $('.top-screen');

        var speed = 3;

        if ($(window).width() > 1260) {

            speed = 7

        }

        $(window).on('scroll', function() {

            var yPos = -($(window).scrollTop() / speed);

            var coords = 'center ' + yPos + 'px';

            block.css({ backgroundPosition: coords });

        });

    

        var links = block.find('a');

    

        links.on('click', function(e) {

            if ('#' !== $(this).attr('href')[0]) return;

            e.preventDefault();

    

            var target = $(this.hash);

    

            $('html, body').animate(

                {

                    scrollTop: target.offset().top

                },

                300

            );

        });

    })();

    

    
});
