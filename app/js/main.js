/**
 * some global settings and functions
 */
const API_FILTER = 'http://nordman.glavnaya.com/app/controller/catalog/filter.php';

var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var measureScrollbar = function($) {
    var element = document.createElement('div');
    (element.className = 'modal-scrollbar-measure'), $('body').append(element);
    var scrollBarWidth = element.offsetWidth - element.clientWidth;
    return $('body')[0].removeChild(element), scrollBarWidth;
};

$.noConflict();
jQuery(document).ready(function($) {
    $('body').removeClass('pageload');

    function globalInitFunction() {
        
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
        
    }

    globalInitFunction();
});
