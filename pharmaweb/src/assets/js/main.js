// Import jQuery và gán vào biến toàn cục
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import các plugin phụ thuộc vào jQuery
require('superfish');
require('owl.carousel');
require('jquery-datetimepicker'); // tên module đúng
require('nice-select2');

// Import CSS nếu bạn dùng Webpack có hỗ trợ CSS loader
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'jquery-datetimepicker/jquery.datetimepicker.css';
import 'nice-select2/dist/css/nice-select2.css';

// Import và khởi tạo WOW.js
import { WOW } from 'wowjs';
const wow = new WOW();

// Nếu dùng GMaps
import GMaps from 'gmaps';

(function ($) {
  "use strict";

  $(document).ready(function () {
    // Superfish
    $('.nav-menu').superfish({
      animation: { opacity: 'show' },
      speed: 400
    });

    // Mobile nav
    if ($('#nav-menu-container').length) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
      $mobile_nav.find('> ul').attr({ class: '', id: '' });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
      $('body').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function () {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function () {
        $('body').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
        $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
      if (window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
          var top_space = $('#header').outerHeight() || 0;
          $('html, body').animate({ scrollTop: target.offset().top - top_space }, 1500, 'easeInOutExpo');

          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
            $('#mobile-body-overly').fadeOut();
          }
          return false;
        }
      }
    });

    // Scroll to hash on load
    $('html, body').hide();
    if (window.location.hash) {
      setTimeout(function () {
        $('html, body').scrollTop(0).show();
        $('html, body').animate({ scrollTop: $(window.location.hash).offset().top }, 1000);
      }, 0);
    } else {
      $('html, body').show();
    }

    // Header scroll effect
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
      }
    });

    // Owl Carousel
    $('.department-slider').owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      nav: false,
      dots: true,
      smartSpeed: 1000,
      responsiveClass: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });

    // Datepicker
    $('#datepicker').datetimepicker({
      timepicker: false,
      format: 'd.m.Y',
    });

    // Nice Select2
    $('select').niceSelect();

    // GMaps
    if ($('#mapBox').length) {
      var $lat = $('#mapBox').data('lat');
      var $lon = $('#mapBox').data('lon');
      var $zoom = $('#mapBox').data('zoom');
      var $marker = $('#mapBox').data('marker');
      var $info = $('#mapBox').data('info');
      var $markerLat = $('#mapBox').data('mlat');
      var $markerLon = $('#mapBox').data('mlon');
      var map = new GMaps({
        el: '#mapBox',
        lat: $lat,
        lng: $lon,
        scrollwheel: false,
        scaleControl: true,
        streetViewControl: false,
        panControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        zoom: $zoom,
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#dcdfe6" }]
          },
        ]
      });
    }
  });

  // Khi trang tải xong
  $(window).on('load', function () {
    wow.init(); // khởi động wow.js
    $('.preloader').fadeOut(500);
  });
})(jQuery);
