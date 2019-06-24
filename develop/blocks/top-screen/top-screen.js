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
