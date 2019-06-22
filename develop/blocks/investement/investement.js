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
