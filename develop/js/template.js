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
                    device: (m(n, i) || m(t, i) || m(r, i)) && !m(f, i),
                },
                amazon: { phone: m(b, i), tablet: !m(b, i) && m(l, i), device: m(b, i) || m(l, i) },
                android: {
                    phone: (!m(f, i) && m(b, i)) || (!m(f, i) && m(a, i)),
                    tablet: !m(f, i) && !m(b, i) && !m(a, i) && (m(l, i) || m(p, i)),
                    device: (!m(f, i) && (m(b, i) || m(l, i) || m(a, i) || m(p, i))) || m(/\bokhttp\b/i, i),
                },
                windows: { phone: m(f, i), tablet: m(s, i), device: m(f, i) || m(s, i) },
                other: {
                    blackberry: m(u, i),
                    blackberry10: m(c, i),
                    opera: m(h, i),
                    firefox: m(w, i),
                    chrome: m(v, i),
                    device: m(u, i) || m(c, i) || m(h, i) || m(w, i) || m(v, i),
                },
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

    document.addEventListener(
        'touchstart',
        function addtouchclass(e) {
            // first time user touches the screen
            document.documentElement.classList.add('can-touch');
            document.removeEventListener('touchstart', addtouchclass, false);
        },
        false
    );

    function lazyLoadPictures(imagesContainers, opts = {}) {
        const options = {
            rootMargin: opts.rootMargin || '0px 50% 100% 50%',
            root: opts.root || null,
            threshold: opts.threshold || 0,
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const imageContainer = entry.target;
                            const image = imageContainer.querySelectorAll('img, source');

                            image.forEach(img => {
                                if (img.dataset && img.dataset.src) {
                                    img.src = img.dataset.src;
                                }

                                if (img.dataset && img.dataset.srcset) {
                                    img.srcset = img.dataset.srcset;
                                }
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
            );

            imagesContainers.forEach(container => observer.observe(container));
        } else {
            imagesContainers.forEach(container => {
                const image = container.querySelector('img');
                const source = container.querySelector('source');

                image.src = source.dataset.srcset;
            });
        }
    }

    function lazyLoadImages(imagesNodes, opts = {}) {
        const options = {
            rootMargin: opts.rootMargin || '0px 0px 100% 0px',
            root: opts.root || null,
            threshold: opts.threshold || 0,
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const image = entry.target;
                            const src = image.getAttribute('data-src');
                            if (!src) return;
                            image.src = src;

                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
            );

            imagesNodes.forEach(image => observer.observe(image));
        } else {
            imagesNodes.forEach(image => {
                const src = image.getAttribute('data-src');
                if (!src) return;
                image.src = src;
            });
        }
    }

    //=require ../blocks/**/*.js
});
