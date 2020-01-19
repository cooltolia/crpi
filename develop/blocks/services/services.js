(function() {
    var slider = $('.services__list');
    var lang = $('html').attr('lang');

    slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '10%',
        arrows: false,
        infinite: false,
        mobileFirst: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    centerPadding: '20%',
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    arrows: true,
                    // centerPadding: '20%'
                },
            },
        ],
    });

    var showMoreLink = $('.services__more-link');
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
