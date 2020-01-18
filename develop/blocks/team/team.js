(function() {
    var team = $('.team');
    if (team.length === 0) return;

    var slider = $('.team__slider');
    var currentSlideIndicator = team.find('.team__counter-current');
    var totalSlideIndicator = team.find('.team__counter-total');

    slider
        .on('init', function(event, slick) {
            currentSlideIndicator.text(slick.currentSlide + 1);
            totalSlideIndicator.text(slick.slideCount);
        })
        .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            currentSlideIndicator.text(nextSlide + 1);
            totalSlideIndicator.text(slick.slideCount);
        });

    slider.slick({
        slidesToShow: 1,
        rows: 0,
        arrows: true,
        // dots: true,
        mobileFirst: true,
        speed: 500,
        adaptiveHeight: true,
        // centerMode: true,
        // infinite: false,
        // responsive: [
        //     {
        //         breakpoint: 767,
        //         settings: {
        //             dots: false,
        //             arrows: true,
        //             prevArrow,
        //             nextArrow,
        //             centerPadding: '35px',
        //         },
        //     },
        //     {
        //         breakpoint: 1279,
        //         settings: {
        //             centerPadding: '100px',
        //             dots: false,
        //             arrows: true,
        //             prevArrow,
        //             nextArrow,
        //         },
        //     },
        // ],
    });
})();
