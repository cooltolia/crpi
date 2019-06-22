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
            var slider = $('.investment__list');
        
            slider.slick({
                slidesToShow: 1.17,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 1280,
                        settings: {
                            arrows: true
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
                    _this.text('Развернуть');
                } else {
                    _this.addClass('active');
                    hidden.show().css('display', 'inline');
                    _this.text('Скрыть');
                }
            });
        })();
        
                (function() {
            var zoom = 17;
            var address = [55.780583, 37.590677];
            var center = [55.780583, 37.590677];
        
            if ($(window).width() < 480) {
                zoom = 16;
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
            $(window).on('scroll', function() {
                var yPos = -($(window).scrollTop() / 3);
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
