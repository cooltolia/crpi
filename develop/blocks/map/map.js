(function() {
    const map = document.querySelector('.map');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        renderYandexMap();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px 100% 0px' }
        );

        observer.observe(map);
    } else {
        renderYandexMap();
    }

    function renderYandexMap() {
        const map = loadYandexMap(
            'https://api-maps.yandex.ru/2.1/?apikey=db533072-8aa5-4ebd-b87c-dd84539d9085&lang=ru_RU'
        );

        /** finally render map with all shops on it */
        map.then(() => {
            ymaps.load(() => {
                // mapInitializer(data);
                mapInitializer();
            });
        });

        function mapInitializer(data) {
            var zoom = 16;
            var address = [55.780583, 37.590677];
            var center = [55.780583, 37.590677];

            if ($(window).width() > 1280) {
                zoom = 17;
                center = [55.780761, 37.593976];
            }

            var lang = $('html').attr('lang');
            var addressText = lang === 'ru' ? 'г. Москва, ул. Лесная, д. 43' : '43, Lesnaya street, Moscow';

            ymaps.ready(function() {
                var myMap;

                myMap = new ymaps.Map('map', {
                    center: center,
                    zoom: zoom,
                    controls: ['zoomControl'],
                });
                var squareLayout = ymaps.templateLayoutFactory.createClass('<div id="customPlacemark" class=""></div>');
                var myPlacemark = new ymaps.Placemark(
                    address,
                    {
                        hintContent: addressText,
                        balloonContent: addressText,
                    },
                    {
                        iconLayout: squareLayout,
                        iconShape: {
                            type: 'Rectangle',
                            coordinates: [
                                [-20, -30],
                                [20, 30],
                            ],
                        },
                        iconOffset: [0, -30],
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
        }
    }

    function loadYandexMap(url) {
        return new Promise(resolve => {
            var yandexMapUrl = url;
            var yandexMapScript = document.createElement('script');
            yandexMapScript.type = 'text/javascript';
            yandexMapScript.src = yandexMapUrl;
            document.body.appendChild(yandexMapScript);

            yandexMapScript.onload = function() {
                resolve();
            };
        });
    }
})();
