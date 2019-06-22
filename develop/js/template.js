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
        //=require ../blocks/**/*.js
    }

    globalInitFunction();
});
