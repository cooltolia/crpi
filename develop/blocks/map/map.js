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
