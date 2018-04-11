$(document).ready(function () {

    //////////
    // COMMON
    //////////
    var _window = $(window);

    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
        force: false,
        refreshDebounceWait: 250,
        appendToBody: true
    });


    // HAMBURGER TOGGLER

    function closeMobileMenu() {
        $('[js-hamburger]').toggleClass('is-active');
        $('.mobile-navi').toggleClass('is-active');
    }

    $('[js-hamburger]').on('click', function (e) {
        $(this).toggleClass('is-active');
        $('.mobile-navi').toggleClass('is-active');

        e.preventDefault();
        e.stopPropagation();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.mobile-navi__menu').length) {
            if ($('[js-hamburger]').is('.is-active')) {
                closeMobileMenu();
            }
        }
    });


    // Scrolldown
    $('[js-scrolldown]').on('click', function () {
        $('body, html').animate({
            scrollTop: $(this).closest('[data-section-slide]').next().offset().top
        }, 1000);
    });

    // ScrollTo
    $('[js-scroll-to]').on('click', function () {
        var section = $(this).data('section');
        if ( _window.width() > 992 ) {
            var scrollTo = $(window).height() * (section - 1);
        } else {
            var scrollTo = $('[data-section-slide="' + section + '"]').offset().top;
        }

        $('body, html').animate({
            scrollTop: scrollTo
        }, 500);
        return false;
    });

    //////////
    // LOGO ANIMATION
    //////////
    var windowHeight = _window.height(),
        windowWidth = _window.width(),
        logoAnimation = $('[data-logo-animation]'),
        logoAnimationWidth = logoAnimation.width(),
        firstSectionOver = $('[data-first-section-over]');

    _window.on('scroll', function() {
        var scrollTop = _window.scrollTop();
        if ( scrollTop < windowHeight && windowWidth > 992 ) {
            var newWidth = logoAnimationWidth - Math.round((logoAnimationWidth * (scrollTop / windowHeight))),
                opacityPercent = (scrollTop / windowHeight);
            logoAnimation.css('width', newWidth);
            logoAnimation.css('transform', 'translateY(-' + (opacityPercent * 100) +'px)');
            if (opacityPercent > 0.6) {
                opacityPercent = 0.6;
            }
            firstSectionOver.css('opacity', opacityPercent);
        }
    });

    _window.on('resize', function() {
        windowHeight = _window.height();
    });


    //////////
    // TOGGLERS, ETC
    //////////
    $('[js-cta-choice-trigger]').on('click', function () {
        $(this).toggleClass('is-opened');
        $('[js-cta-choice-options]').toggleClass('is-opened');
    });

    $('[js-cta-choice-options] span').on('click', function () {
        $('.cta-choice__trigger span').text(' ' + $(this).data('text'))
        $(this).addClass('is-chosen').siblings().removeClass('is-chosen');
        $('[js-cta-choice-trigger]').removeClass('is-opened');
        $('[js-cta-choice-options]').removeClass('is-opened');
    });

    $('[data-more-bono]').on('click', function() {
        $('[data-bono-card]').show();
        $(this).hide();
        return false;
    });


    //////////
    // SLIDERS
    //////////

    var slickNextArrow = '<div class="slick-prev"><svg class="ico ico-slick-prev"><use xlink:href="img/sprite.svg#ico-slick-prev"></use></svg></div>';
    var slickPrevArrow = '<div class="slick-next"><svg class="ico ico-slick-next"><use xlink:href="img/sprite.svg#ico-slick-next"></use></svg></div>';

    $('[js-slider-requests]').slick({
        autoplay: false,
        dots: false,
        arrows: true,
        prevArrow: slickNextArrow,
        nextArrow: slickPrevArrow,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    $('[js-full-slider]').slick({
        autoplay: false,
        dots: false,
        arrows: false,
        prevArrow: slickNextArrow,
        nextArrow: slickPrevArrow,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        // slidesToScroll: 1,
        centerMode: false,
        variableWidth: false
    });

    $('[js-full-slider]').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var linkedControl = $(slick.$slider).closest('.section').find('.slider-control[data-slide=' + (nextSlide + 1) + ']');
        linkedControl.addClass('is-active').siblings().removeClass('is-active');
    });

    // slider full controls
    $('.slider-control__dot').on('click', function () {
        var slideNum = $(this).parent().data('slide');
        $(this).closest('.section').find('[js-full-slider]').slick('slickGoTo', slideNum - 1);
    });


    //////////
    // MODALS
    //////////

    // Magnific Popup
    // var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble'
    });

    ////////////
    // UI
    ////////////

    // Masked input
    $(".js-dateMask").mask("99.99.99", {placeholder: "ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});


});
