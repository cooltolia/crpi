jQuery;const API_FILTER="http://nordman.glavnaya.com/app/controller/catalog/filter.php";var debounce=function(e,o,t){var a;return function(){var n=this,s=arguments,i=t&&!a;clearTimeout(a),a=setTimeout(function(){a=null,t||e.apply(n,s)},o),i&&e.apply(n,s)}},measureScrollbar=function(e){var o=document.createElement("div");o.className="modal-scrollbar-measure",e("body").append(o);var t=o.offsetWidth-o.clientWidth;return e("body")[0].removeChild(o),t};$.noConflict(),jQuery(document).ready(function(e){var o,t,a,n,s,i,r;e("body").removeClass("pageload"),function(){var o={send:function(e){return new Promise(function(t,a){e.nocache=Math.floor(1e6*Math.random()+1),e.Action="Send";var n=JSON.stringify(e);o.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?",n,function(e){t(e)})})},ajaxPost:function(e,t,a){var n=o.createCORSRequest("POST",e);n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.onload=function(){var e=n.responseText;null!=a&&a(e)},n.send(t)},ajax:function(e,t){var a=o.createCORSRequest("GET",e);a.onload=function(){var e=a.responseText;null!=t&&t(e)},a.send()},createCORSRequest:function(e,o){var t=new XMLHttpRequest;return"withCredentials"in t?t.open(e,o,!0):"undefined"!=typeof XDomainRequest?(t=new XDomainRequest).open(e,o):t=null,t}},t=e(".form"),a=e('.form__input[name="email"]');a.inputmask({alias:"email",jitMasking:!0});var n=e('.form__input[name="name"]'),s=e(".form__textarea"),i=e(".form__error"),r=e(".form__success"),l=e(".form__success-button");t.on("submit",function(t){t.preventDefault();var l=Inputmask.isValid(a.val(),{alias:"email"}),c=n.val().length>=3,m=s.val().length>=3,u=e("input.agreeCheckbox");if(l||a.next().show(),c||n.next().show(),m||s.next().show(),1!=u.prop("checked")){if(l&&c&&m){i.hide();var d="Имя: "+n.val()+"; E-mail: "+a.val()+"; Комментарий: "+s.val();a.val(""),n.val(""),s.val(""),o.send({SecureToken:"189816d4-5060-4120-ab59-10bc81d7ee1e",To:"abd.oybek@gmail.com",From:"abd.oybek@gmail.com",Subject:"Заявка с сайта ЦРПИ",Body:d}).then(function(e){console.log(e),r.fadeIn(300).addClass("active")})}}else console.log("spamer ;(")}),l.on("click",function(){r.fadeOut(300).removeClass("active")})}(),o=e(".investment__list"),t=e("html").attr("lang"),o.slick({slidesToShow:1.17,slidesToScroll:1,arrows:!1,infinite:!1,mobileFirst:!0,infinite:!0,responsive:[{breakpoint:1279,settings:{arrows:!0,slidesToShow:1.1}}]}),e(".investment__more-link").on("click",function(o){o.preventDefault();var a=e(this),n=a.prev().find(".more");a.hasClass("active")?(a.removeClass("active"),n.hide(),"ru"===t?a.text("Развернуть"):a.text("More")):(a.addClass("active"),n.show().css("display","inline"),"ru"===t?a.text("Скрыть"):a.text("Hide"))}),a=16,n=[55.780583,37.590677],s=[55.780583,37.590677],e(window).width()>1280&&(a=17,s=[55.780761,37.593976]),ymaps.ready(function(){var o;o=new ymaps.Map("map",{center:s,zoom:a,controls:["zoomControl"]});var t=ymaps.templateLayoutFactory.createClass('<div id="customPlacemark" class=""></div>'),i=new ymaps.Placemark(n,{hintContent:"г. Москва, ул. Лесная, д. 43",balloonContent:"г. Москва, ул. Лесная, д. 43"},{iconLayout:t,iconShape:{type:"Rectangle",coordinates:[[-20,-30],[20,30]]},iconOffset:[0,-30]});i.events.add("mouseenter",function(){e("#customPlacemark").addClass("custom-placemark-hover")}),i.events.add("mouseleave",function(){e("#customPlacemark").removeClass("custom-placemark-hover")}),o.geoObjects.add(i),o.behaviors.disable("scrollZoom")}),i=e(".top-screen"),r=3,e(window).width()>1260&&(r=7),e(window).on("scroll",function(){var o="center "+-e(window).scrollTop()/r+"px";i.css({backgroundPosition:o})}),i.find("a").on("click",function(o){if("#"===e(this).attr("href")[0]){o.preventDefault();var t=e(this.hash);e("html, body").animate({scrollTop:t.offset().top},300)}})});