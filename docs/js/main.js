jQuery;const API_FILTER="http://nordman.glavnaya.com/app/controller/catalog/filter.php";var debounce=function(e,o,a){var t;return function(){var n=this,s=arguments,i=a&&!t;clearTimeout(t),t=setTimeout(function(){t=null,a||e.apply(n,s)},o),i&&e.apply(n,s)}},measureScrollbar=function(e){var o=document.createElement("div");o.className="modal-scrollbar-measure",e("body").append(o);var a=o.offsetWidth-o.clientWidth;return e("body")[0].removeChild(o),a};$.noConflict(),jQuery(document).ready(function(e){var o,a,t,n,s;e("body").removeClass("pageload"),function(){var o=e(".form"),a=e('.form__input[name="email"]');a.inputmask({alias:"email",jitMasking:!0});var t=e('.form__input[name="name"]'),n=e(".form__textarea"),s=e(".form__error"),i=e(".form__success"),r=e(".form__success-button");o.on("submit",function(e){e.preventDefault();var o=Inputmask.isValid(a.val(),{alias:"email"}),i=t.val().length>=3,r=n.val().length>=3;o||a.next().show(),i||t.next().show(),r||n.next().show(),o&&i&&r&&(s.hide(),Email.send({SecureToken:"bd2db3be-05cd-4518-81a3-4bc9d28d7b8b",To:"cooltolia@gmail.com",From:"cooltolia@mail.ru",Subject:"nameInput",Body:"commentInput"}).then(e=>alert(e)))}),r.on("click",function(){i.fadeOut(300).removeClass("active")})}(),e(".investment__list").slick({slidesToShow:1.17,slidesToScroll:1,arrows:!1,infinite:!1,mobileFirst:!0,responsive:[{breakpoint:1280,settings:{arrows:!0,slidesToShow:1.1}}]}),e(".investment__more-link").on("click",function(o){o.preventDefault();var a=e(this),t=a.prev().find(".more");a.hasClass("active")?(a.removeClass("active"),t.hide(),a.text("Развернуть")):(a.addClass("active"),t.show().css("display","inline"),a.text("Скрыть"))}),o=16,a=[55.780583,37.590677],t=[55.780583,37.590677],e(window).width()>1280&&(o=17,t=[55.780761,37.593976]),ymaps.ready(function(){var n;n=new ymaps.Map("map",{center:t,zoom:o,controls:["zoomControl"]});var s=ymaps.templateLayoutFactory.createClass('<div id="customPlacemark" class=""></div>'),i=new ymaps.Placemark(a,{hintContent:"г. Москва, ул. Лесная, д. 43",balloonContent:"г. Москва, ул. Лесная, д. 43"},{iconLayout:s,iconShape:{type:"Rectangle",coordinates:[[-20,-30],[20,30]]},iconOffset:[0,-30]});i.events.add("mouseenter",function(){e("#customPlacemark").addClass("custom-placemark-hover")}),i.events.add("mouseleave",function(){e("#customPlacemark").removeClass("custom-placemark-hover")}),n.geoObjects.add(i),n.behaviors.disable("scrollZoom")}),n=e(".top-screen"),s=3,e(window).width()>1260&&(s=7),e(window).on("scroll",function(){var o="center "+-e(window).scrollTop()/s+"px";n.css({backgroundPosition:o})}),n.find("a").on("click",function(o){if("#"===e(this).attr("href")[0]){o.preventDefault();var a=e(this.hash);e("html, body").animate({scrollTop:a.offset().top},300)}})});