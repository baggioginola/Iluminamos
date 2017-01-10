/**
 * Created by mario on 04/ene/2017.
 */




jQuery(document).ready(function(){

    jQuery.noConflict();

    // youtube apikey
    var apikey = 'AIzaSyC3vPqgTEuhAXgYRYAFFMHfY1cSAW-3-Zs';

    // select viewport
    jQuery(function(){
        //console.log("User-agent header sent: " + navigator.userAgent);
        // Detect if browser is mobile
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            var ww = ( jQuery(window).width() < window.screen.width ) ? jQuery(window).width() : window.screen.width; //get proper width
            //console.log('el ww = ' + ww);
            var mw = 640; // min width of site
            var ratio =  ww / mw; //calculate ratio
            //console.log('el ww = ' + ww + ' el mw = ' + mw + ' ratio = ' + ratio);
            if( ww < mw){ //smaller than minimum size
                jQuery('meta[name="viewport"]').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
            }else{ //regular size
                jQuery('meta[name="viewport"]').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
            }
        }
    });

    var windowWidht = jQuery(window).width();
    var windowHeight = jQuery(window).height();
    jQuery("#info").html('<p>w = ' + windowWidht + ' px : h = ' + windowHeight + ' px</p>');

    jQuery(window).resize(function() {
        var windowWidht = jQuery(window).width();
        var windowHeight = jQuery(window).height();
        jQuery("#info").html('<p>w = ' + windowWidht + ' px : h = ' + windowHeight + ' px</p>');

        if ( jQuery('body').attr('id') == 'home' ) {
            if (windowWidht < 768) {
                jQuery('.highlights .hl_blockFour').removeClass('active');
                jQuery('.highlights .hl_blockFour.firstBlock').addClass('active');
                jQuery('.highlights .hl_control .hl-indicators li').removeClass('active');
                jQuery('.highlights .hl_control .hl-indicators li:first').addClass('active');
            }
        }
    });


    // check privacy policy cookie
    var cookieName = jQuery('body').attr('cn');
    if (typeof cookieName !== typeof undefined && cookieName !== false) {
        var cookiePolicy = jQuery.cookie(cookieName);
    } else {
        var cookieName = "cookieppc";
        var cookiePolicy = "";
    }

    // show/hide message policy privacy
    if ( cookiePolicy == 1 ) {
        // cookie exist
        jQuery('#contentWarning-text').hide();
    } else {
        // cookie don't exist
        //console.log('cookieName = ' + cookieName + ' :: cookiePolicy no existe, mostramos mensaje .... ');
        jQuery('#contentWarning-text').fadeIn();
    }

    // click button accept policy privacy
    jQuery(document).on('click', '#contentWarning-text a.button-close', function(event){
        event.preventDefault();
        var cookieName = jQuery('body').attr('cn');
        var cookiePolicy = jQuery.cookie(cookieName);
        if ( cookiePolicy != null ) {
            // cookie exist
        } else {
            // cookie don't exist
            jQuery.cookie(cookieName, '1', { expires: 365, path: '/' });
        }
        jQuery('#contentWarning-text').fadeOut();
        return false
    });

    // scroll web accept policy privacy
    jQuery(window).scroll(function() {

        var minScroll = 150;
        var cookieName = jQuery('body').attr('cn');
        var cookiePolicy = jQuery.cookie(cookieName);

        if ( cookiePolicy != null ) {
            // cookie exist
        } else {
            // cookie don't exist
            if (jQuery(this).scrollTop() > minScroll) {
                jQuery.cookie(cookieName, '1', { expires: 365, path: '/' });
                jQuery('#contentWarning-text').fadeOut();
            }
        }
        return false;
    });


    // modal send by email
    /*
     jQuery(document).on('click', '#buttonSendEmail', function(event){
     event.preventDefault();
     var email = jQuery('#emailInput').val();
     console.log('click send email = ' + email);
     jQuery('#modalSendEmail').modal('toggle');
     return false
     }); */


    // click share central button
    jQuery('#shareCentral a.openMenu').on('click', function(event){
        event.preventDefault();

        var itemsHeight = jQuery(this).height();

        if ( jQuery(this).hasClass('shareOpen') ) {
            jQuery(this).parent().animate({
                height: itemsHeight
            });
            jQuery(this).removeClass('shareOpen');
        } else {
            jQuery(this).addClass('shareOpen');

            var itemsShare = jQuery('#shareCentral .componentsShare ul li.compShare').size();
            var totalHeight = parseInt(itemsHeight * (itemsShare + 1));

            jQuery(this).parent().animate({
                height: totalHeight
            });

        }
        return false
    });

    // rotate 180deg arrowDown to Up and hide wishlist and localSites
    jQuery('#lenguageDetail').on('show.bs.collapse', function () {
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('#search-block').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');

        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateZero');

        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateZero');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateHalf');
    });

    // rotate 180deg arrowDown to Down and hide wishlist and localSites
    jQuery('#lenguageDetail').on('hide.bs.collapse', function () {
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateZero');
    });

    // rotate 180deg arrowDown to Up and hide wishlist and lenguage
    jQuery('#localSitesDetail').on('show.bs.collapse', function () {
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('#search-block').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');

        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateZero');

        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateZero');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateHalf');
    });

    // rotate 180deg arrowDown to Down and hide wishlist and lenguage
    jQuery('#localSitesDetail').on('hide.bs.collapse', function () {
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateZero');
    });

    // wishlist show and hide submenu lenguage, submenu local Sites, search block
    jQuery('#wishlistDetail').on('show.bs.collapse', function () {
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('#search-block').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');

        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateZero');

        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateZero');
    });

    // search-block show and hide submenu lenguage, submenu local Sites, wishlist block, and mobile menu general
    jQuery('#search-block-v2').on('show.bs.collapse', function () {
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#menuOptions').removeClass('in');

        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateZero');

        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateZero');

        // mobile search-block hide share button and product download
        var windowWidht = jQuery(window).width();
        if (windowWidht < 991) {
            jQuery('#directLinkCentral').fadeOut();
            jQuery('#shareCentral').fadeOut();
        }
    });

    // mobile search-block show share button and product download
    jQuery('#search-block-v2').on('hide.bs.collapse', function () {
        var windowWidht = jQuery(window).width();
        if (windowWidht < 991) {
            jQuery('#directLinkCentral').fadeIn();
            jQuery('#shareCentral').fadeIn();
        }
    });


    // mobile menuOptions-block show and hide search block
    jQuery('#menuOptions').on('show.bs.collapse', function () {
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');

        jQuery('.languageButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.languageButton a span.arrowDown').addClass('animated rotateZero');

        jQuery('.localSitesButton a span.arrowDown').removeClass('animated rotateHalf');
        jQuery('.localSitesButton a span.arrowDown').addClass('animated rotateZero');
    });

    // mobile search-block set full height
    /*
     jQuery('#search-block-v2').on('shown.bs.collapse', function () {
     var windowHeight = jQuery(window).height();
     var pos = jQuery('#search-block-v2 #a-s-results-mobile').offset();
     var divResultsPosition = pos.top;
     var newHeight = (windowHeight - divResultsPosition) + 'px';
     jQuery('#search-block-v2 #a-s-results-mobile').height(newHeight);
     console.log('windowHeight = ' + windowHeight + ' divResultsPosition = ' + divResultsPosition + ' newHeight = ' + newHeight);
     });
     */

    // submenu rotate 180deg arrowDown to Up
    jQuery('.dropdownGeneralMenu').on('show.bs.dropdown', function () {
        var idSubmenu = '#' + jQuery(this).prev().attr('id');
        jQuery(idSubmenu + ' .arrowDown').removeClass('animated rotateZero');
        jQuery(idSubmenu + ' .arrowDown').addClass('animated rotateHalf');
    });


    // submenu rotate 180deg arrowDown to Down
    jQuery('.dropdownGeneralMenu').on('hide.bs.dropdown', function () {
        var idSubmenu = '#' + jQuery(this).prev().attr('id');
        jQuery(idSubmenu + ' .arrowDown').removeClass('animated rotateHalf');
        jQuery(idSubmenu + ' .arrowDown').addClass('animated rotateZero');
    });


    // click close wishlist button
    jQuery('#closeWindowWishlist').on('click', function(event){
        event.preventDefault();
        jQuery('.wishlistButton a.navbar-toggle').click();
        return false
    });


    // click close search button
    jQuery('#close-search-button-mobile').on('click', function(event){
        event.preventDefault();
        jQuery('#search-block').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');
        jQuery('#advanced-search-block').removeClass('in');
        jQuery('#advanced-search-button .advanced').show();
        jQuery('#advanced-search-button .simple').hide();
        jQuery('#a-s-results').removeClass('in');
        clearDesktopResults();
        return false
    });

    // click close search button
    jQuery('#close-search-button-desktop').on('click', function(event){
        event.preventDefault();
        jQuery('#search-block').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');
        jQuery('#advanced-search-block').removeClass('in');
        jQuery('#advanced-search-button .advanced').show();
        jQuery('#advanced-search-button .simple').hide();
        jQuery('#a-s-results').removeClass('in');
        clearDesktopResults();
        return false
    });

    function clearDesktopResults()	{

        // remove old results simple search
        jQuery('#a-s-results-desktop #desktop-content-results').text('');
        jQuery('#a-s-results-desktop #desktop-content-results-products').text('');
        jQuery('#a-s-results-desktop #desktop-content-results-projects').text('');
        jQuery('#a-s-results-desktop #desktop-content-results-others').text('');
        jQuery('#desktop-text-results').text('');
        jQuery('#desktop-text-results-all').text('');
        jQuery('#desktop-text-results-products').text('');
        jQuery('#desktop-text-results-projects').text('');
        jQuery('#desktop-text-results-others').text('');
        jQuery('#desktop-pagination-all').empty();
        jQuery('#desktop-pagination-products').empty();
        jQuery('#desktop-pagination-projects').empty();
        jQuery('#desktop-pagination-others').empty();

        // remove old results advanced search
        jQuery('#a-s-results .container .row .media-results').text('');
        jQuery('#a-s-pagination-all').empty();

        return false;
    }

    // select simple text simple/advanced button
    jQuery('#advanced-search-block').on('show.bs.collapse', function () {
        // show advanced
        jQuery('#a-s-results').removeClass('in');
        jQuery('#advanced-search-button .advanced').hide();
        jQuery('#advanced-search-button .simple').show();
        // reset simple search
        jQuery('#simplesearch').val('');

        clearDesktopResults();
        updateFilterAdvancedSearch();
    });

    // select advanced text simple/advanced button
    jQuery('#advanced-search-block').on('hide.bs.collapse', function () {
        // show simple
        jQuery('#a-s-results').removeClass('in');
        jQuery('#advanced-search-button .advanced').show();
        jQuery('#advanced-search-button .simple').hide();
        // reset simple search
        jQuery('#simplesearch').val('');

        clearDesktopResults();
    });

    // check active search advanced selector
    jQuery('#advanced-search-block .dropdownGeneralMenu').on('show.bs.dropdown', function () {
        //event.preventDefault();
        jQuery('#a-s-results').removeClass('in');
        var id = jQuery(this).attr('id');
        jQuery(this).parent('li.selector-list').addClass('active');
    });

    // un-check search advanced selector
    jQuery('#advanced-search-block .dropdownGeneralMenu').on('hide.bs.dropdown', function () {
        //event.preventDefault();
        var id = jQuery(this).attr('id');
        jQuery(this).parent('li.selector-list').removeClass('active');
    });

    // click filters options in advanced search
    /*
     jQuery('#advanced-search-block li.options-list a').on('click', function(event){
     event.preventDefault();
     var idParent = jQuery(this).parent('li').parent('ul').parent('.col-md-12').parent('.row').parent('.container').parent().attr('id');
     jQuery('#' + idParent + ' li.options-list').removeClass('active');
     jQuery(this).parent('li').addClass('active');
     //updateFilterAdvancedSearch();
     return false
     });
     */


    // return all values filters selected
    function updateFilterAdvancedSearch()	{
        var filters = "";
        var seriesValue = jQuery('select[name=series]').val();
        filters = filters + "/SERIES::" + seriesValue + "/-";
        jQuery('#advanced-search-block .advanced-search-selector').each(function(index) {
            var filtername = jQuery(this).text();
            var targetSelector = jQuery(this).attr('data-target');
            var filtervalue = jQuery(targetSelector + ' li.options-list.active a').attr('ref');
            filters = filters + "/" + filtername + "::" + filtervalue + "/-";
        });
        return filters;
    }



    // open secondary menu on hover
    /*jQuery('.localSitesButton a.navbar-toggle, .languageButton').on('mouseover', function(){
        var thisdiv = jQuery(this).attr("data-target");
        if ( !jQuery(thisdiv).hasClass('in') ) {
            jQuery(this).trigger('click');
        }
    }).on('mouseout', function(){

    });
*/
    // close secondary menus on hover out
    jQuery("#header").hover(
        function(){
            //
        },
        function(){
            if ( jQuery('#lenguageDetail').hasClass('in') ) {
                jQuery('.languageButton a.navbar-toggle').trigger('click').blur();
            }
            if ( jQuery('#localSitesDetail').hasClass('in') ) {
                jQuery('.localSitesButton a.navbar-toggle').trigger('click').blur();
            }
            if ( jQuery('#ssssearch-block').hasClass('in') ) {	// search block disabled
                jQuery('.searchButton a.navbar-toggle').trigger('click').blur();
            }
            if ( jQuery('#wishlistDetail').hasClass('in') ) {
                jQuery('.wishlistButton a.navbar-toggle').trigger('click').blur();
            }
        }
    );

    // close secondary menus on hover out
    jQuery("#header").mouseleave(function(){
        jQuery('#lenguageDetail').removeClass('in');
        jQuery('#localSitesDetail').removeClass('in');
        jQuery('#wishlistDetail').removeClass('in');
        jQuery('#search-block-v2').removeClass('in');
    });


    // main menu hover effect
    /*
     if (jQuery(window).width() > 768) {
     jQuery('.navbar .dropdown').on('mouseover', function(){
     jQuery('.dropdown-toggle', this).trigger('click');
     }).on('mouseout', function(){
     jQuery('.dropdown-toggle', this).trigger('click').blur();
     });
     } else {
     jQuery('.navbar .dropdown').off('mouseover').off('mouseout');
     }*/


    // click mobile select search type
    jQuery('.mobile-container-search-block a.select-type-results').on('click', function(event){
        event.preventDefault();
        var typeToShow = '#' + jQuery(this).attr('href');
        var paginationToShow = jQuery(this).attr('data-pagination');
        // update results
        jQuery('#a-s-results-mobile .media-results').hide();
        jQuery('#a-s-results-mobile .search-pagination').hide();
        jQuery('#a-s-results-mobile ' + typeToShow).show();
        jQuery('#a-s-results-mobile ' + paginationToShow).show();

        //update selectors
        jQuery('.mobile-container-search-block a.select-type-results').removeClass('active');
        jQuery(this).addClass('active');
        return false;
    });

    // click desktop select search type
    jQuery('.desktop-container-search-block a.select-type-results').on('click', function(event){
        event.preventDefault();
        var typeToShow = '#' + jQuery(this).attr('href');
        var paginationToShow = jQuery(this).attr('data-pagination');
        // update results
        jQuery('#a-s-results-desktop .media-results').hide();
        jQuery('#a-s-results-desktop .search-pagination').hide();
        jQuery('#a-s-results-desktop ' + typeToShow).show();
        jQuery('#a-s-results-desktop ' + paginationToShow).show();

        //update selectors
        jQuery('.desktop-container-search-block a.select-type-results').removeClass('active');
        jQuery(this).addClass('active');
        return false;
    });


    // select first.
    jQuery('.mobile-container-search-block a.select-type-results:first').click();

    // animation go to top page
    jQuery(function() {
        jQuery('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var headerHeight = jQuery('#header').height();
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html,body').animate({
                        scrollTop: target.offset().top - headerHeight
                    }, 1000);
                    return false;
                }
            }
        });
    });



    if ( jQuery('body').attr('id') == 'home' || jQuery('body').attr('id') == 'history') {

        // move arrow down
        //timer = setInterval(moveArrowDown,2000);

        // initializes carousel Top
        if ( jQuery('#section_1').hasClass('carousel') && jQuery('#section_1').attr('data-ride') == 'carousel' ) {

            // top #section_1
            var paddingTopSectionOne = jQuery('#header').height() + 'px';
            jQuery('#section_1').css('padding-top', paddingTopSectionOne);

            // item height
            var headerHeight = jQuery('#header').height();
            var windowHeight = jQuery(window).height();
            var carouselHeight = (windowHeight - headerHeight - 6);
            var carouselHeightValue = (windowHeight - headerHeight - 6) + 'px';
            if ( jQuery(window).width() <= 640 ) {
                var carouselHeight = 422;
                var carouselHeightValue = carouselHeight + 'px';
            }
            jQuery('.carousel .carousel-inner .item').css('height', carouselHeightValue);

            // caption top position
            var captionMaxHeight = 0;
            jQuery('#section_1 .carousel-inner .item .carousel-caption').each(function(index) {
                var captionHeight = jQuery(this).height();
                if (captionHeight > captionMaxHeight) {
                    captionMaxHeight = captionHeight;
                }
            });
            var topCaption = ((windowHeight - headerHeight - 6) - captionMaxHeight) / 2;
            var topCaptionValue = topCaption + 'px';
            jQuery('.carousel .carousel-inner .carousel-caption').css('top', topCaptionValue);


            // arrows top position
            if ( jQuery(window).width() <= 992 ) {
                var topArrows = ((headerHeight + carouselHeight) - 100 ) + 'px';
            } else {
                var topArrows = (headerHeight + topCaption + captionMaxHeight + 30) + 'px';
            }
            jQuery('.carousel .carousel-control').css('top', topArrows);

            // update first time carousel counter slides
            updateCarouselCounter('#section_1');

            // set indicators width
            var carouselWidth = jQuery('#section_1').width();
            var carouselSize = jQuery('#section_1 .carousel-indicators li').size();
            var itemsWidth = parseInt((carouselWidth - (carouselSize)) / carouselSize) + 'px';
            jQuery('#section_1 .carousel-indicators li').css('width', itemsWidth)

            // set carousel timer

            var newtimer = jQuery('#section_1').attr('data-timer');
            if (typeof newtimer !== typeof undefined && newtimer !== false) {
                // set value
                var timerValue = newtimer;
            } else {
                // default value
                var timerValue = 5000;
            }

            // set carousel timer
            jQuery('#section_1').carousel({
                interval: timerValue
            });

            // carousel desktop control
            jQuery('.carousel-control.left').click(function() {
                jQuery('#section_1').carousel('prev');
            });

            jQuery('.carousel-control.right').click(function() {
                jQuery('#section_1').carousel('next');
            });

            /* CONTROL TOUCH
             jQuery('#section_1 .carousel-inner').swiperight(function() {
             jQuery('#section_1').carousel('prev');
             });
             jQuery('#section_1 .carousel-inner').swipeleft(function() {
             jQuery('#section_1').carousel('next');
             });
             */

            // his event is fired when the carousel has completed its slide transition.
            jQuery('#section_1').on('slid.bs.carousel', function () {
                updateCarouselCounter('#section_1');
            });
        }

        // control highlights
        if ( jQuery('.container').hasClass('highlights-new') ) {
            // click highlights buttons mobile (new)
            jQuery('.highlights-new .hl_control_mobile ol.hl-indicators li').on('click', function(event){
                event.preventDefault();
                var dataTarget = jQuery(this).attr('hl-data-target');
                var dataSlideTo = parseInt(jQuery(this).attr('hl-data-slide-to'));

                if ( !jQuery(this).hasClass('active') ) {
                    // change slide
                    jQuery('.highlights-new .row div .row .hl-item_block.active').addClass('animated fadeOut');
                    jQuery('.highlights-new .row div .row .hl-item_block.active').removeClass('active animated fadeIn fadeOut');
                    jQuery('.highlights-new .row div .row .hl-item_block:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
                    // update indicators
                    jQuery('.highlights-new .hl_control_mobile ol.hl-indicators li').removeClass('active');
                    jQuery('.highlights-new .hl_control_mobile ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
                }
            });
        }

        if ( jQuery('.container').hasClass('highlights') ) {

            // click highlights buttons (old)
            /*
             jQuery('.highlights .hl_control ol.hl-indicators li').on('click', function(event){
             event.preventDefault();
             var dataTarget = jQuery(this).attr('hl-data-target');
             var dataSlideTo = parseInt(jQuery(this).attr('hl-data-slide-to'));
             var itemActive = jQuery('.highlights .row div .hl_blockItems .hl_blockFour.active').index();

             if ( itemActive != dataSlideTo ) {
             // change slide
             jQuery('.highlights .row div .hl_blockFour.active').addClass('animated fadeOut');
             jQuery('.highlights .row div .hl_blockFour.active').removeClass('active animated fadeIn fadeOut');
             jQuery('.highlights .row div .hl_blockFour:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
             // update indicators
             jQuery('.highlights .hl_control ol.hl-indicators li').removeClass('active');
             jQuery('.highlights .hl_control ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
             }
             });
             */

            // click highlights buttons mobile (old)
            /*
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li').on('click', function(event){
             event.preventDefault();
             var dataTarget = jQuery(this).attr('hl-data-target');
             var dataSlideTo = parseInt(jQuery(this).attr('hl-data-slide-to'));
             var itemActive = jQuery('.highlights .row div .hl_blockItems .hl_blockFour.firstBlock .hl-item_block.active').index();

             if ( itemActive != dataSlideTo ) {
             // change slide
             jQuery('.highlights .row div .hl_blockFour.firstBlock .hl-item_block.active').addClass('animated fadeOut');
             jQuery('.highlights .row div .hl_blockFour.firstBlock .hl-item_block.active').removeClass('active animated fadeIn fadeOut');
             jQuery('.highlights .row div .hl_blockFour.firstBlock .hl-item_block:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
             // update indicators
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li').removeClass('active');
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
             }
             });
             */

            /* CONTROL TOUCH
             jQuery('.hl_blockFour .hl-item_block').swiperight(function() {
             // prev highlights
             var totalItems = jQuery('.highlights .hl_control_mobile ol.hl-indicators li').size();
             var itemActive = jQuery('.highlights .row div .hl_blockItems .hl_blockFour.firstBlock .hl-item_block.active').index();
             var itemTarget = itemActive - 1;
             if ( itemTarget >= 0) {
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li:eq(' +  itemTarget + ')').click();
             } else {
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li:last').click();
             }
             });

             jQuery('.hl_blockFour .hl-item_block').swipeleft(function() {
             // next highlights
             var totalItems = jQuery('.highlights .hl_control_mobile ol.hl-indicators li').size();
             var itemActive = jQuery('.highlights .row div .hl_blockItems .hl_blockFour.firstBlock .hl-item_block.active').index();
             var itemTarget = itemActive + 1;
             if ( itemTarget < totalItems) {
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li:eq(' +  itemTarget + ')').click();
             } else {
             jQuery('.highlights .hl_control_mobile ol.hl-indicators li:eq(0)').click();
             }
             });
             */
        }

        // show/hide menu products on mobile screens
        jQuery('.product_menu').on('show.bs.collapse', function () {
            // do something ...
            var idMenu = '#' + jQuery(this).attr('id');
            jQuery(idMenu + ' .product_item_families ul, ' + idMenu + ' .product_item_share').css('opacity', 0);
            jQuery(idMenu + ' .product_item_bg').animate({height: 396},{duration: 500, queue: false, complete: function(){
                jQuery(idMenu + ' .product_item_families ul, ' + idMenu + ' .product_item_share').animate({opacity: 1},{duration: 300, queue: false, complete: function(){
                    // when animation finish ...
                    jQuery(idMenu + ' .product_item_bg').css('height', '');
                }
                });	// end animation opacity
            }
            });	// end animation show menu products

        });


        // init scrollbar in products block
        if ( jQuery('.product_item_families').length ) {
            if ( jQuery('.product_item_families').hasClass('mCustomScrollbar') ) {
                jQuery('.product_item_families').mCustomScrollbar('update');
            } else {
                jQuery('.product_item_families').mCustomScrollbar({
                    scrollButtons:{enable:false}
                });
            }
        }


        // hover in products block UPDATE scrollbar
        jQuery('.product_item_families').hover(function(event){
            event.preventDefault();
            if ( jQuery(this).hasClass('mCustomScrollbar') ) {
                jQuery(this).mCustomScrollbar('update');
            } else {
                jQuery(this).mCustomScrollbar({
                    scrollButtons:{enable:false}
                });
            }
        });


        // click in mobile devices, open menu
        jQuery('.product_item_aa').on("click", function (e) { 'use strict'; //satisfy code inspectors
            e.preventDefault();
            if( jQuery(this).hasClass('menuVisible') ) {
                jQuery('.product_item').removeClass('menuVisible');
            } else {
                jQuery('.product_item').removeClass('menuVisible');
                jQuery(this).addClass('menuVisible');
            }

            //return false; //extra, and to make sure the function has consistent return points
        });

        // click in menu link mobile devices, go to url
        jQuery('.product_item_families ul li aaa').on("click", function (e) {
            e.preventDefault();
            var url = jQuery(this).attr('href');
            jQuery(location).attr('href',url);
        });

        // history scrollspy
        if ( jQuery('#myScrollspy').length ) {

            var headerHeight = jQuery('#header').height() + 20;
            jQuery('body').attr('data-spy', 'scroll');
            jQuery('body').attr('data-target', '#myScrollspy');
            jQuery('body').attr('offset', headerHeight);

            jQuery('body').scrollspy({ target: '#myScrollspy', offset: headerHeight });

            // first check position
            var topPositionItem = parseInt(jQuery('#section_2').offset().top);
            var idBody = jQuery('body').attr('id');
            if ( jQuery(window).scrollTop() > topPositionItem || idBody == 'home' ) {
                jQuery('#myScrollspy').fadeIn();
            }


            jQuery(window).scroll(function() {

                var headerHeight = jQuery('#header').height() + 20;
                var topPositionItem = parseInt(jQuery('#section_2').offset().top);

                if (idBody != 'home') {
                    if (jQuery(this).scrollTop() > topPositionItem - headerHeight) {
                        jQuery('#myScrollspy').fadeIn();
                    }
                    if (jQuery(this).scrollTop() <= topPositionItem - headerHeight) {
                        jQuery('#myScrollspy').fadeOut();
                    }
                }

            });
        }


    }		// end if id=home


    if ( jQuery('body').attr('id') == 'productDetail' ) {

        // update color catalogue
        var catalogue = jQuery('#section_1').attr('catalogue');
        jQuery('#menuOptions').addClass(catalogue);
        jQuery('#shareCentral').addClass(catalogue);

        // init carousel products
        if ( jQuery('#carouselProduct').length ) {
            // update first time carousel counter slides
            updateCarouselCounter('#carouselProduct');

            jQuery('#carouselProduct').carousel({
                interval: false
            });

            jQuery('#carouselProduct .carousel-control.left').click(function() {
                jQuery('#carouselProduct').carousel('prev');
            });

            jQuery('#carouselProduct .carousel-control.right').click(function() {
                jQuery('#carouselProduct').carousel('next');
            });

            // his event is fired when the carousel has completed its slide transition.
            jQuery('#carouselProduct').on('slid.bs.carousel', function () {
                updateCarouselCounter('#carouselProduct');
            });
        }

        //jQuery(".img-responsive").elevateZoom({ zoomType: "inner", cursor: "crosshair" });

        // init scrollbar in features text
        if ( jQuery('#colFeatures').length ) {
            if ( jQuery('#colFeatures').hasClass('mCustomScrollbar') ) {
                jQuery('#colFeatures').mCustomScrollbar('update');
            } else {
                jQuery('#colFeatures').mCustomScrollbar({
                    scrollButtons:{enable:false}
                });
            }
        }

        // create meta video object
        if ( jQuery('.embed-responsive-item').length ) {

            // create video meta tags
            jQuery('iframe.embed-responsive-item').each(function(index) {
                var idContentVideo = "#" + jQuery(this).attr('id');
                var videoUrl = jQuery(this).attr('src');
                if (videoUrl.indexOf("youtube") > -1) {
                    var videoUrl_array = videoUrl.split('/');
                    var videoid = videoUrl_array[videoUrl_array.length-1];
                    if ( videoid.indexOf("?") > -1) {
                        var videoid = videoid.substring(0, videoid.indexOf("?")-1);
                    }
                    // create tag duration
                    getYoutubeDuration(videoid, idContentVideo);
                    // create tag description, publishedAt and thumbnailUrl
                    getYoutubeData(videoid, idContentVideo);
                }

                if (videoUrl.indexOf('vimeo') > -1 ) {
                    // create tag duration, description and thumbnailUrl
                    getVimeoData(videoUrl, idContentVideo);
                }
            });

        }

        // init scrollbar in related products
        if ( jQuery('#relatedProducts_list').length ) {

            var windowProductsWidth = jQuery('#relatedProducts_list').width();
            var itemsSize = jQuery('#relatedProducts_list ul li').size();
            var itemsWidth = jQuery('#relatedProducts_list ul li:first').width();
            var itemsMargin = jQuery('#relatedProducts_list ul li:first').css('margin-right');
            var itemsMargin = parseInt(itemsMargin.substring(0,itemsMargin.length - 2));
            var totalItemsWidth = (itemsWidth + itemsMargin) * itemsSize;
            //console.log('windowProductsWidth = ' + windowProductsWidth + ' itemsSize = ' + itemsSize + ' itemsWidth = ' + itemsWidth + ' itemsMargin = ' + itemsMargin);
            //console.log('totalItemsWidth = ' + totalItemsWidth);

            if (totalItemsWidth > windowProductsWidth) {
                if ( jQuery('#relatedProducts_list').hasClass('mCustomScrollbar') ) {
                    jQuery('#relatedProducts_list').mCustomScrollbar('update');
                } else {
                    jQuery('#relatedProducts_list').mCustomScrollbar({
                        axis:'x',
                        horizontalScroll:true,
                        autoExpandScrollbar:true,
                        advanced:{autoExpandHorizontalScroll:true},
                        scrollButtons:{enable:false},
                        mouseWheel:{enable: false}
                    });
                }
            } else {
                jQuery('#relatedProducts_list').addClass('centerItems');
            }


            // click related products buttons mobile
            jQuery('#relatedProducts_list ol.hl-indicators li').on('click', function(event){
                event.preventDefault();
                var dataTarget = jQuery(this).attr('data-target');
                var dataSlideTo = parseInt(jQuery(this).attr('data-slide-to'));
                var itemActive = jQuery('#relatedProducts_list ul li.active').index();
                //console.log('dataTarget = ' + dataTarget + ' dataSlideTo = ' + dataSlideTo + ' itemActive = ' + itemActive);
                if ( itemActive != dataSlideTo ) {
                    // change slide
                    jQuery('#relatedProducts_list ul li.active').addClass('animated fadeOut');
                    jQuery('#relatedProducts_list ul li.active').removeClass('active animated fadeIn fadeOut');
                    jQuery('#relatedProducts_list ul li:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
                    // update indicators
                    jQuery('#relatedProducts_list ol.hl-indicators li').removeClass('active');
                    jQuery('#relatedProducts_list ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
                }
            });
        }

        // init scrollbar in additional finished products
        if ( jQuery('#additionalFinished_list').length ) {

            var windowProductsWidth = jQuery('#additionalFinished_list').width();
            var itemsSize = jQuery('#additionalFinished_list ul li').size();
            var itemsWidth = jQuery('#additionalFinished_list ul li:first').width();
            var itemsMargin = jQuery('#additionalFinished_list ul li:first').css('margin-right');
            var itemsMargin = parseInt(itemsMargin.substring(0,itemsMargin.length - 2));
            var totalItemsWidth = (itemsWidth + itemsMargin) * itemsSize;
            //console.log('windowProductsWidth = ' + windowProductsWidth + ' itemsSize = ' + itemsSize + ' itemsWidth = ' + itemsWidth + ' itemsMargin = ' + itemsMargin);
            //console.log('totalItemsWidth = ' + totalItemsWidth);

            if (totalItemsWidth > windowProductsWidth) {
                if ( jQuery('#additionalFinished_list').hasClass('mCustomScrollbar') ) {
                    jQuery('#additionalFinished_list').mCustomScrollbar('update');
                } else {
                    jQuery('#additionalFinished_list').mCustomScrollbar({
                        axis:'x',
                        horizontalScroll:true,
                        autoExpandScrollbar:true,
                        advanced:{autoExpandHorizontalScroll:true},
                        scrollButtons:{enable:false}
                    });
                }
            } else {
                jQuery('#additionalFinished_list').addClass('centerItems');
            }


            // click additional Finished buttons mobile
            jQuery('#additionalFinished_list ol.hl-indicators li').on('click', function(event){
                event.preventDefault();
                var dataTarget = jQuery(this).attr('data-target');
                var dataSlideTo = parseInt(jQuery(this).attr('data-slide-to'));
                var itemActive = jQuery('#additionalFinished_list ul li.active').index();
                //console.log('dataTarget = ' + dataTarget + ' dataSlideTo = ' + dataSlideTo + ' itemActive = ' + itemActive);
                if ( itemActive != dataSlideTo ) {
                    // change slide
                    jQuery('#additionalFinished_list ul li.active').addClass('animated fadeOut');
                    jQuery('#additionalFinished_list ul li.active').removeClass('active animated fadeIn fadeOut');
                    jQuery('#additionalFinished_list ul li:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
                    // update indicators
                    jQuery('#additionalFinished_list ol.hl-indicators li').removeClass('active');
                    jQuery('#additionalFinished_list ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
                }
            });

        }


        if ( jQuery('.productTypeTwo').length ) {

            var windowWidth = jQuery(window).width();
            var windowHeight = jQuery(window).height();
            var carouselProductHeight = jQuery('#carouselProduct').height();
            var carouselProductPaddingTop = jQuery('#carouselProduct').css('padding-top');
            var carouselProductPaddingTop = parseInt(carouselProductPaddingTop.substring(0,carouselProductPaddingTop.length - 2));
            var pointScroll = (carouselProductHeight + carouselProductPaddingTop) - windowHeight;
            //var topPositionTF = parseInt(jQuery('.productDetail.productTypeTwo #tf_container').offset().top);

            if ( windowWidth > 992 ) {
                jQuery(window).scroll(function() {
                    var scrollTop = jQuery(this).scrollTop();

                    if ( !jQuery('.productDetail.productTypeTwo #tf_container .containertf').hasClass('animationDone') ) {

                        if ( jQuery(this).scrollTop() > pointScroll ) {
                            jQuery('.productDetail.productTypeTwo #tf_container .containertf').stop().animate({marginTop: -665},{duration: 750, queue: false, complete: function(){
                                // when animation finish ...
                                jQuery('.productDetail.productTypeTwo #tf_container .containertf').addClass('animationDone');
                            }
                            });	// end animation opacity

                        }

                    }

                });
            }

        }

    }		// end if id=productDetail


    if ( jQuery('body').attr('id') == 'productOverview' ) {

        // init select tab
        if ( jQuery('#productSelect-tab').length ) {

            // click tab selector
            jQuery('#productSelect-tab a').click(function (e) {
                e.preventDefault()
                jQuery(this).tab('show');
                var idTabActive = jQuery(this).attr('href');
                jQuery('#productSelect-tab').attr('active', idTabActive);
                if ( idTabActive == '#bycatalogue') {
                    jQuery('#buttonReset').hide();
                }
            })

            var paramTypeFinder = GetURLParameter('tab');
            if ( paramTypeFinder != "" && typeof paramTypeFinder != 'undefined') {
                // has param
                var paramFilterName = GetURLParameter('filtername');
                var paramFilterValue = GetURLParameter('filtervalue');
                //console.log('slplfunctions2ready.js paramTypeFinder = ' + paramTypeFinder + " :: " + paramFilterName + " = " + paramFilterValue);
            } else {
                jQuery(function () {
                    var paramType = GetURLParameter('type');
                    if ( paramType != "" && typeof paramType != 'undefined') {
                        jQuery('#productSelect-tab a:last').tab('show');
                        jQuery('#productSelect-tab').attr('active', '#bycatalogue');
                    } else {
                        // default on load select finder
                        jQuery('#productSelect-tab a:first').tab('show');
                        jQuery('#productSelect-tab').attr('active', '#finder');
                    }
                });
            }

            // mobile click select tab
            jQuery('#productSelect-tab-mobile a').click(function (e) {
                e.preventDefault();
                e.stopImmediatePropagation(); // disable scroll

                if ( jQuery('#productSelect-tab-mobile').hasClass('selectorsHide') ) {
                    // show selectors

                    // update class
                    jQuery('#productSelect-tab-mobile').removeClass('selectorsHide');
                    jQuery('#productSelect-tab-mobile').addClass('selectorsShow');

                    // scroll to selectors
                    var headerHeight = jQuery('#header').height();
                    jQuery('html,body').animate({
                        scrollTop: headerHeight
                    }, 500, function() {
                        // Animation complete.
                    });

                    // hide central box
                    jQuery('#directLinkCentral').hide();
                    jQuery('#shareCentral').hide();

                    // select tab
                    jQuery(this).tab('show');
                    var idTabActive = jQuery(this).attr('href');
                    jQuery('#productSelect-tab-mobile').attr('active', idTabActive);

                    jQuery(this).removeClass('bt-menu-close');
                    jQuery(this).addClass('bt-menu-open');

                    if ( idTabActive == '#bycatalogue') {
                        // select by catalogue
                        jQuery('#buttonReset').hide();
                        jQuery('.new-mobile-finder .mobileInfo').show();
                        jQuery('.new-mobile-finder .selects-col').show();
                        jQuery('.new-mobile-finder #mobileByCatalogue').show();

                        var itemsResultsByCatalogue = parseInt(jQuery('#bycatalogResults .tab-pane').size());
                        if (itemsResultsByCatalogue == 0){
                            // reset selectors mobile
                            jQuery('#bycatalogue .selects-col .dropdownlistmobile li a.byCatalogueButton').removeClass('active');
                            jQuery('#bycatalogue .selects-col .dropdownlistmobile li a.byCatalogueButton .item-list').removeClass('active');
                            jQuery('#bycatalogue .selects-col .dropdownlistmobile li a.byCatalogueButton .item-list-checkbox').removeClass('active');
                            jQuery('#bycatalogue .selects-col .dropdownlistmobile li a.byCatalogueButton .item-list-checkbox').text('');

                            // reset mobile info
                            jQuery('#bycatalogue .mobileInfo #inputResumeByCatalague')[0].checked = false;
                            jQuery('#bycatalogue .mobileInfo #labelMobileInfoByCatalogue').text('');
                        }

                    } else {
                        // select finder
                        jQuery('.new-mobile-finder .mobileInfo').show();
                        jQuery('.new-mobile-finder .selects-col').show();

                        // show buttons bottom
                        jQuery('#finder .mobileFilterGroupButtons').show();
                        if ( jQuery('#finder .mobileFilterGroupButtons').hasClass('selection-on') ) {
                            // show buttons new search / see results
                            jQuery('#mobileFinderNewSearch').show();
                            jQuery('#mobileFinderSeeResults').show();
                        } else {
                            // show button close
                            jQuery('#mobileFinderClose').show();
                        }

                    }

                    // calculate .selects-col height
                    var windowHeight = jQuery(window).height();
                    var pos = jQuery('.new-mobile-finder .selects-col').offset();
                    var divResultsPosition = pos.top;
                    var newHeight = (windowHeight - divResultsPosition) + 'px';
                    jQuery('.new-mobile-finder .selects-col').height(newHeight);

                } else {	// hasClass selectorsShow

                    if ( jQuery(this).parent().hasClass('active') ) {
                        // hide selectors
                        jQuery('#productSelect-tab-mobile').removeClass('selectorsShow');
                        jQuery('#productSelect-tab-mobile').addClass('selectorsHide');

                        // hide filter selectors
                        jQuery('.new-mobile-finder .mobileInfo').hide();
                        jQuery('.new-mobile-finder .selects-col').hide();

                        jQuery(this).removeClass('bt-menu-open');
                        jQuery(this).addClass('bt-menu-close');

                        // show central box
                        jQuery('#directLinkCentral').show();
                        jQuery('#shareCentral').show();

                    } else {
                        // change tab

                        // select tab
                        jQuery(this).tab('show');
                        var idTabActive = jQuery(this).attr('href');
                        jQuery('#productSelect-tab-mobile').attr('active', idTabActive);

                        jQuery(this).removeClass('bt-menu-close');
                        jQuery(this).addClass('bt-menu-open');

                        if ( idTabActive == '#bycatalogue') {
                            // select by catalogue
                            jQuery('#buttonReset').hide();
                            jQuery('.new-mobile-finder .mobileInfo').show();
                            jQuery('.new-mobile-finder .selects-col').show();

                            // change icon button
                            jQuery('#productSelect-tab-mobile .tabselector[href="#finder"]').removeClass('bt-menu-open');
                            jQuery('#productSelect-tab-mobile .tabselector[href="#finder"]').addClass('bt-menu-close');

                        } else {
                            // select finder
                            jQuery('.new-mobile-finder .mobileInfo').show();
                            jQuery('.new-mobile-finder .selects-col').show();

                            // change icon button
                            jQuery('#productSelect-tab-mobile .tabselector[href="#bycatalogue"]').removeClass('bt-menu-open');
                            jQuery('#productSelect-tab-mobile .tabselector[href="#bycatalogue"]').addClass('bt-menu-close');

                            // show buttons bottom

                        }
                    }

                }	// enf if

            });



        }


        if ( jQuery('#bycatalogue').length ) {

            // return all values filters selected
            function updateFilterFinder(desktopOrMobileClass)	{
                var filters = "";
                jQuery('#finder .selects-col .bc-block .' + desktopOrMobileClass + ' > ul').each(function(index) {
                    var filtername = jQuery(this).attr('filtername');
                    var filtervalue = jQuery(this).attr('filtervalue');
                    filters = filters + "/" + filtername + "::" + filtervalue + "/-";
                });
                return filters;
            }


            // show/hide submenu bycatalogue
            jQuery('#bycatalogue .selects-col .bc-block .desktop-sel h3.button-submenu').on('click', function(event){
                event.preventDefault();
                if ( jQuery(this).parent().hasClass('active') ) {
                    jQuery(this).parent().removeClass('active').removeClass('animated').removeClass('fadeIn');
                } else {
                    jQuery('#bycatalogue .selects-col .bc-block .desktop-sel').removeClass('active').removeClass('animated').removeClass('fadeIn');
                    jQuery(this).parent().addClass('active').addClass('animated').addClass('fadeIn');
                }
            });


            // select left column #finder
            jQuery('#finder .selects-col .bc-block ul li aaa').on('click', function(event){
                event.preventDefault();

                var filternameValue = jQuery(this).attr('filtername');
                var filtervalueValue = jQuery(this).attr('filtervalue');

                // close window results table
                jQuery('#finder #closeWindow').click();
                jQuery('#bycatalogue #closeWindow').click();

                // update selected option left column
                jQuery('#finder .bc-block ul li a[filtername=' + filternameValue +'] .item-list').removeClass('active');
                jQuery(this).children('.item-list').addClass('active');

                var desktopOrMobileClass = "";
                // update parent list
                if ( jQuery(this).parent().parent().hasClass('submenu-finder') ) {
                    jQuery(this).parent().parent().parent().parent().attr('filtername', filternameValue).attr('filtervalue', filtervalueValue);
                    desktopOrMobileClass = jQuery(this).parent().parent().parent().parent().parent().attr('class');
                } else {
                    jQuery(this).parent().parent().attr('filtername', filternameValue).attr('filtervalue', filtervalueValue);
                    desktopOrMobileClass = jQuery(this).parent().parent().parent().attr('class');
                }

                var filtersToFind = updateFilterFinder(desktopOrMobileClass);
                console.log('filtersToFind = ' + filtersToFind);

                // update results right column
                jQuery('#finder .results-col .tab-pane').removeClass('active');
                jQuery('#finder .results-col .tab-pane[' + filternameValue + '=' + filtervalueValue + ']').addClass('active');

                // scrollTo top
                var headerHeight = jQuery('#header').height();
                target = jQuery('#section_1');
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);

                // if submenu activate parent
                if ( jQuery(this).parent('li').parent('ul').hasClass('submenu-finder') ) {
                    jQuery(this).parent('li').parent('ul').prev().children('.item-list').addClass('active');
                }


                return false;
            });

            // select left column #bycatalogue
            jQuery('#bycatalogue .selects-col .bc-block ul li aaa').on('click', function(event){
                event.preventDefault();

                // close window results table
                jQuery('#finder #closeWindow').click();
                jQuery('#bycatalogue #closeWindow').click();

                // update selected option left column
                jQuery('#bycatalogue .bc-block ul li a .item-list').removeClass('active');
                jQuery(this).children('.item-list').addClass('active');

                // update results right column
                var hrefValue = jQuery(this).attr('href');

                jQuery('#bycatalogue .results-col .tab-pane').removeClass('active');
                jQuery('#bycatalogue .results-col .tab-pane' + hrefValue).addClass('active');

                return false;
            });


            // select first family left column
            //jQuery('#bycatalogue .bc-block ul:first li:first a').click();

            // close window results table bycatalogue
            jQuery('#bycatalogue #closeWindow').on('click', function(event){
                event.preventDefault();
                jQuery('#bycatalogue .results-col .results-detail').removeClass('active');
                jQuery('#bycatalogue .results-col .results-item').removeClass('active');
                jQuery('#bycatalogue .results-col .results-bg-opacity').removeClass('active');
                jQuery('#table').html('');
            });

            // close window results table finder
            jQuery('#finder #closeWindowFinder').on('click', function(event){
                event.preventDefault();
                jQuery('#finder .results-col .results-detail').removeClass('active');
                jQuery('#finder .results-col .results-item').removeClass('active');
                jQuery('#finder .results-col .results-bg-opacity').removeClass('active');
                jQuery('#table').html('');
            });


            /*
             // open window result table
             jQuery(document).on('click', '#bycatalogue .results-col .tab-pane a.serieweb', function(event){
             event.preventDefault();

             var isActive = jQuery(this).parent().hasClass('active');

             if (isActive) {
             // close window results
             jQuery('#bycatalogue #closeWindow').click();
             } else {
             // open window results

             // url to load JSON
             var hrefValue = jQuery(this).attr('href');
             //console.log('hrefValue = ' + hrefValue);
             // init create json string
             var jsonString = "[";

             function iterateNodes(data) {
             var itemsDiv = [];
             var level1 = data.name;
             var firstField = "true";

             for (var i = 0, l = data.nodes.length; i < l; i++) {
             var node = data.nodes[i];
             var nodeProperties = node.properties;

             // init create row name field
             if (firstField == 'true') {
             jsonString = jsonString + '{"name":"' + node.name + '"';
             var firstField = "false";
             } else {
             jsonString = jsonString + ',{"name":"' + node.name + '"';
             }

             jQuery.each(nodeProperties, function(name, value) {
             // create others fields
             jsonString = jsonString + ',"' + value.name + '":"' + value.values + '"';
             });

             // end create row
             jsonString = jsonString + '}';
             }

             // end create json string
             jsonString = jsonString + ']';

             var jsonString = '[';
             var jsonString = jsonString + '{"reference": "35-3561-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "15&#xBA;","color_temperature": "Blanco c&#xE1;lido - 3000K","lamp": "26W"}';
             var jsonString = jsonString + ',{"reference": "35-3562-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "24&#xBA;","color_temperature": "Blanco c&#xE1;lido - 3000K","lamp": "26W"}';
             var jsonString = jsonString + ',{"reference": "35-3563-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "36&#xBA;","color_temperature": "Blanco c&#xE1;lido - 3000K","lamp": "26W"}';
             var jsonString = jsonString + ',{"reference": "35-3564-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "15&#xBA;","color_temperature": "Blanco c&#xE1;lido - 4000K","lamp": "24W"}';
             var jsonString = jsonString + ',{"reference": "35-3565-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "24&#xBA;","color_temperature": "Blanco c&#xE1;lido - 4000K","lamp": "24W"}';
             var jsonString = jsonString + ',{"reference": "35-3566-14-37","finishCode": "Blanco","installation": "2000 N","cri": "80","lents_angle": "36&#xBA;","color_temperature": "Blanco c&#xE1;lido - 4000K","lamp": "24W"}';
             var jsonString = jsonString + ',{"reference": "35-3567-14-37","finishCode": "Blanco","installation": "2000 N","cri": "90","lents_angle": "15&#xBA;","color_temperature": "Blanco c&#xE1;lido - 3000K","lamp": "23W"}';
             var jsonString = jsonString + ',{"reference": "35-3568-14-37","finishCode": "Blanco","installation": "2000 N","cri": "90","lents_angle": "24&#xBA;","color_temperature": "Blanco c&#xE1;lido - 3000K","lamp": "23W"}';
             var jsonString = jsonString + ']';

             // values table
             var array_finishCode = ["Blanco"];
             var array_installation = ["2000 N"];
             var array_cri = ["80", "90"];
             var array_lents_angle = ["15&#xBA;", "24&#xBA;", "36&#xBA;"];
             var array_color_temperature = ["Blanco c&#xE1;lido - 3000K", "Blanco c&#xE1;lido - 4000K"];
             var array_cri = ["23W", "24W", "26W"];

             // create json object
             var finalObjJson = jQuery.parseJSON(jsonString);


             // return string without special chars
             function HtmlDecode(s) {
             return jQuery('<div>').html(s).text();
             }

             // click in clear filter button
             jQuery('.filter-reset').click(function(event) {
             event.preventDefault();
             jQuery('.filter-row input[type=checkbox]').each(function() { jQuery(this).prop('checked', false); });
             jQuery('#table').bootstrapTable('load',finalObjJson);
             });

             // click in checkbox filters
             jQuery('#filter-bar-bycatalogue :checkbox').click(function() {


             var $this = jQuery(this);
             // $this will contain a reference to the checkbox
             if ($this.is(':checked')) {
             // the checkbox was checked
             console.log('checked = ' + $this.name);
             } else {
             // the checkbox was unchecked
             console.log('unchecked = ' + $this);
             }

             arrayFilters = new Array();
             counterX = 0;
             counterY = 0;
             jQuery('#filter-bar-bycatalogue ul.multi-level li.dropdown-submenu a.filter-name').each(function(index) {

             arrayFilters[counterX] = new Array();
             arrayFilters[counterX][0] = jQuery(this).attr('ref');
             counterY = 1;
             jQuery(this).next('ul').children('li').children('.input-group').each(function(index) {
             var isChecked = jQuery(this).children('.input-group-addon').children('input').is(':checked');
             if (isChecked) {
             arrayFilters[counterX][counterY] = jQuery(this).children('a').attr('value');
             counterY++;
             }
             });
             counterX++;
             });

             for(var i = 0; i < arrayFilters.length; i++){
             console.log('arrayFilters = ' + i + ' = ' + arrayFilters[i]);
             }
             console.log('arrayFilters = ' + arrayFilters);

             console.log('Ahora el json original = ');

             var newJson = [];

             // init table use data

             //var actualJson = $table.bootstrapTable('getData');


             // iterate all original json
             for ( var i = 0; i < finalObjJson.length; i++) {
             var obj = finalObjJson[i];

             var counterChildren = 0;
             var counterTrue = 0;
             // iterate array filters first level (filter name)
             for ( var j = 0; j < arrayFilters.length; j++) {
             var filterName = arrayFilters[j][0];
             var childrens = arrayFilters[j].length;
             console.log('filters array name = ' + filterName + ' childrens length = ' + childrens);
             if (childrens > 1){
             counterChildren++;
             // iterate array filters second level (filter values)
             for ( var k = 1; k < arrayFilters[j].length; k++) {
             var filterChildren = arrayFilters[j][k];
             var originalObjectvalue = obj[filterName].toString();
             //filterChildren = html_encode(filterChildren);
             originalObjectvalue = HtmlDecode(originalObjectvalue);
             console.log('filters array name = ' + filterName + ' children = ' + filterChildren + ' :: original object value = ' + originalObjectvalue);
             if ( filterChildren == originalObjectvalue) {
             console.log('el ref = ' + obj['reference'].toString() + ' si coincide .....');
             counterTrue++;
             //newJson.push(obj);
             }
             }
             }

             }
             if ( counterTrue == counterChildren) {
             newJson.push(obj);
             console.log('el ref = ' + obj['reference'].toString() + ' si entra en el nuevo objeto .........................');
             }

             console.log(obj);
             }

             console.log('newJson = ');
             console.log(newJson);
             console.log('original = ');
             console.log(finalObjJson);

             // create new json values
             for(var i in finalObjJson) {
             //result.push([i, finalObjJson [i]]);
             var item = finalObjJson[i];
             console.log('recorriente json = ' + i + ' = ' + item.reference);
             }

             // refresh table
             if ( newJson.length > 0) {
             jQuery('#table').bootstrapTable('load',newJson);
             } else {
             jQuery('#table').bootstrapTable('load',finalObjJson);
             }

             });

             // create table results
             jQuery('#table').bootstrapTable({
             data: finalObjJson,
             striped: false,
             pagination: false,
             pageList: [5, 10, 25],
             pageSize: 10,
             search: false,
             showColumns: false,
             showRefresh: false,
             minimumCountColumns: 2,
             showFilter: true,
             columns: [
             {
             field: 'reference',
             title: 'Reference',
             align: 'left',
             valign: 'bottom',
             sortable: true
             },{
             field: 'finishCode',
             title: 'finish Code',
             align: 'center',
             valign: 'bottom',
             sortable: true
             },{
             field: 'installation',
             title: 'installation',
             align: 'center',
             valign: 'bottom',
             sortable: true
             },{
             field: 'cri',
             title: 'cri',
             align: 'center',
             valign: 'bottom',
             sortable: true
             },{
             field: 'lents_angle',
             title: 'lents angle',
             align: 'center',
             valign: 'bottom',
             sortable: true
             },{
             field: 'color_temperature',
             title: 'color temperature',
             align: 'center',
             valign: 'bottom',
             sortable: true
             },{
             field: 'lamp',
             title: 'lamp',
             align: 'center',
             valign: 'bottom',
             sortable: true
             }

             ]
             }).on('click-row.bs.table', function (e, row, $element) {
             e.preventDefault();
             // close window results
             jQuery('#bycatalogue #closeWindow').click();

             // call product detail page by Reference
             var url = pathDetail + ".html?productUrl="  + pathProducts + "/" + row.name;
             jQuery(location).attr('href',url);

             //console.log('Event: click-row.bs.table, object reference = ' + row.name);
             //console.log('Event: click-row.bs.table, data: ' + JSON.stringify(row));

             return false;
             });

             // create filters
             jQuery('#table thead tr th').each(function(index) {
             var filterName = jQuery(this).children('.th-inner').text();
             console.log('filterName' + filterName);

             });

             }	// end function

             // position window results
             var positionBlock = jQuery('#bycatalogue .results-col').offset();
             var position = jQuery(this).parent().offset();
             var itemHeight = jQuery(this).parent().height();
             var itemBorderTop = jQuery(this).parent().css('borderTopWidth');
             var itemBorderTop = parseInt(itemBorderTop.substring(0,itemBorderTop.length - 2));
             var topPosition = (position.top - positionBlock.top) + itemBorderTop + itemHeight + 23 + 154;
             jQuery('#bycatalogue .results-col .results-detail').css('top', topPosition);
             jQuery('#bycatalogue .results-col .results-detail').addClass('active');

             // effect item selected
             jQuery('#bycatalogue .results-col .results-bg-opacity').addClass('active');
             jQuery(this).parent().addClass('active');

             // title serie
             var title = jQuery(this).parent().parent().attr('serie');
             jQuery('#titleTable').text(title);

             // capture url detail
             var pathDetail = jQuery(this).attr('pathdetail');
             var pathProducts = jQuery(this).attr('pathproducts');

             // capture data
             jQuery.getJSON(hrefValue, function( data ) {
             var dataNodes = data.nodes;
             iterateNodes(data);
             });

             }

             return false;
             });
             */
        }


        jQuery('#finder .row .selects-col .bc-block ul li a').tooltip();
        jQuery('#bycatalogue .row .selects-col .bc-block ul li a').tooltip();

        // click accordion go to top
        jQuery(document).on('click', '.buttonAccordion', function(event){
            event.preventDefault()
            //console.log('click')
            var headerHeight = jQuery('#header').height();
            var target = jQuery('#section_1');
            var targetOffset = target.offset();
            jQuery('html,body').animate({
                scrollTop: targetOffset.top - headerHeight
            }, 1000);
            return false;
        })

        jQuery(window).scroll(function() {
            var idTabActive = jQuery('#productSelect-tab').attr('active');
            //console.log('idTabActive = ' + idTabActive);
            var column = jQuery(idTabActive);
            var position = column.offset();
            var heightColumnLeft = jQuery(idTabActive + ' .selects-col').height();
            var windowHeight = jQuery(window).height();
            var columnWidth = jQuery(idTabActive + ' .selects-col').width();
            var pointToShow = (position.top + heightColumnLeft) - (windowHeight / 2) + 30;
            var footer = jQuery('.footer');
            var positionFooter = footer.offset();
            var topFooter = positionFooter.top;
            var maxHeight = (topFooter - (windowHeight / 2)) - 100;

            // only md and lg
            var windowScreen = jQuery(window).width();
            if (windowScreen > 991){
                jQuery('.accordion').css('width', columnWidth);

                if( jQuery(this).scrollTop() > pointToShow && jQuery(this).scrollTop() < maxHeight ){
                    jQuery(idTabActive + ' .accordion').fadeIn();
                } else {
                    jQuery(idTabActive + ' .accordion').fadeOut();
                }
            }

        });

        // mobile click filter bycatalogue
        jQuery('#bycatalogue #filterBycatalogue button').on('click', function(event){
            event.preventDefault();

            var screenHeight = jQuery(window).height();
            var buttonBottom = jQuery(this).parent().css('bottom');
            var buttomHeight = jQuery(this).parent().height();

            if ( buttonBottom == '0px' ) {
                jQuery(this).parent().css('bottom', 'auto');

                // move button
                jQuery(this).parent().animate({
                    top: 0
                    //bottom: screenHeight - buttomHeight
                });
                // animate arrow
                jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateZero');
                jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateHalf');

                // show filters
                jQuery('.mobilebg').show();
                jQuery('.selects-col').fadeIn();

                // show button find
                jQuery('.mobileFilterClose').fadeIn();

            } else {

                // hide filters
                jQuery('.mobilebg').hide();
                jQuery('.selects-col').fadeOut();

                jQuery(this).parent().css('top', 'auto');

                // move button
                jQuery(this).parent().animate({
                    bottom: 0
                });
                // animate arrow
                jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateHalf');
                jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateZero');

            }
            return false
        });

        // mobile click filter bycatalogue find
        jQuery('#bycatalogue .mobileFilterClose').on('click', function(event){
            event.preventDefault();
            jQuery('#bycatalogue #filterBycatalogue button').click();
            return false
        });

        // mobile click filter finder
        jQuery('#finder #filterFinder button').on('click', function(event){
            event.preventDefault();

            var screenHeight = jQuery(window).height();
            var buttonBottom = jQuery(this).parent().css('bottom');
            var buttomHeight = jQuery(this).parent().height();

            if ( buttonBottom == '0px' ) {
                jQuery(this).parent().css('bottom', 'auto');

                // move button
                jQuery(this).parent().animate({
                    top: 0
                    //bottom: screenHeight - buttomHeight
                });
                // animate arrow
                jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateZero');
                jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateHalf');

                // show filters
                jQuery('.mobilebg').show();
                jQuery('.selects-col').fadeIn();

                // show button find
                jQuery('.mobileFilterClose').fadeIn();
            } else {

                // hide filters
                jQuery('.mobilebg').hide();
                jQuery('.selects-col').fadeOut();

                jQuery(this).parent().css('top', 'auto');
                // move button
                jQuery(this).parent().animate({
                    bottom: 0
                });
                // animate arrow
                jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateHalf');
                jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateZero');

            }
            return false
        });

        // mobile click filter finder find
        jQuery('#finder .mobileFilterClose').on('click', function(event){
            event.preventDefault();
            jQuery('#finder #filterFinder button').click();
            return false
        });

        // mobile click tab selectors
        jQuery('a.buttonDropdown').on('click', function(event){
            event.preventDefault();
            var idTarget = jQuery(this).attr('href');
            if ( jQuery(idTarget).hasClass('listopen') ){
                // close this dropdown
                jQuery(idTarget).slideUp();
                jQuery(idTarget).removeClass('listopen');

            } else {
                // close others
                jQuery('.dropdownlist').slideUp();
                jQuery('.dropdownlist').removeClass('listopen');
                // show selected
                jQuery(idTarget).slideDown();
                jQuery(idTarget).addClass('listopen');
            }

            return false
        });

        // update accordion bycatalogue
        /*
         jQuery('#bycatalogue .selects-col .bc-block ul li a').on('click', function(event){
         event.preventDefault();
         var catalogueTitle = jQuery(this).attr('cattitle');
         var catalogueText = jQuery(this).text();

         jQuery('#bycatalogue #accordionCatalog').attr('class', '');
         jQuery('#bycatalogue #accordionCatalog').addClass('bc-block');
         jQuery('#bycatalogue #accordionCatalog').addClass(catalogueTitle);
         jQuery('#bycatalogue #accordionCatalogTitle').text(catalogueTitle);
         jQuery('#bycatalogue #accordionCatalogText span.text').text(catalogueText);

         return false
         });
         */

        // update accordion finder
        /*
         jQuery('#finder .selects-col .bc-block ul li a').on('click', function(event){
         event.preventDefault();
         var finderTitle = jQuery(this).attr('filtername');
         var finderText = jQuery(this).text();

         jQuery('#finder #accordionFinderTitle').text(finderTitle);
         jQuery('#finder #accordionFinderText span.text').text(finderText);

         return false
         });
         */

        // select active by param
        /*
         var paramType = GetURLParameter('type');
         if ( paramType != "" && typeof paramType != 'undefined') {
         console.log('paramType = ' + paramType);
         var res = paramType.split("/");
         var catalogue = res[1];
         var type = res[2];
         console.log('catalogue = ' + catalogue + ' type = ' + type);
         //jQuery('#bycatalogue .row .selects-col .byCatalogueButton[catalogue="' + catalogue + '"][type="' + type + '"]').click();
         jQuery('#bycatalogue .row .selects-col .byCatalogueButton[catalogue=technical][type=signal]').click();
         }
         */


    }		// end if id=productOverview


    if ( jQuery('body').attr('id') == 'emotionalOverview' ) {
        // init carousel projects
        if ( jQuery('#carouselProject').length ) {
            // update first time carousel counter slides
            updateCarouselCounter('#carouselProject');

            jQuery('#carouselProject').carousel({
                interval: false
            });

            jQuery('#carouselProject .carousel-control.left').click(function() {
                jQuery('#carouselProject').carousel('prev');
            });

            jQuery('#carouselProject .carousel-control.right').click(function() {
                jQuery('#carouselProject').carousel('next');
            });

            // his event is fired when the carousel has completed its slide transition.
            jQuery('#carouselProject').on('slid.bs.carousel', function () {
                updateCarouselCounter('#carouselProject');
            });
        }
    }		// end if id=emotionalOverview


    if ( jQuery('body').attr('id') == 'experienceOverview' ) {	// projects

        function updateCounter() {
            var itemsActive = jQuery('#experienceOverview .resultsProjects .tab-pane.active').size();
            jQuery('#results-value').html(itemsActive);
        }

        function scrollToResults() {
            var headerHeight = jQuery('#header').height();
            target = jQuery('.resultsProjects');
            jQuery('html,body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 500);
        }

        function disable_checkbox() {
            // disable checkbox zones if not experiences found
            jQuery('#exp-filter .form-item input').removeAttr('disabled');
            jQuery('#exp-filter .form-item').removeClass('disable');

            jQuery('#exp-filter .form-item input').each(function(index) {
                //console.log( 'name = ' + jQuery(this).attr('name') + ' checked = ' + jQuery(this).attr('checked'));
                if ( jQuery(this).attr('checked') == 'checked' ) {
                    jQuery(this).removeAttr('disabled');
                    jQuery(this).parent().removeClass('disable');
                } else {
                    jQuery(this).attr("disabled", true);
                    jQuery(this).parent().addClass('disable');
                }
            });

        }

        function updateZonesByExperience() {
            // reset selectors by zone and bottom filter checkbox by zone
            jQuery('#experienceButtons .row div ul:last li').removeClass('active');
            jQuery('#experienceButtons .row div ul:last li').removeClass('no-active');
            jQuery('#exp-filter .form-item input').prop('checked', false);
            jQuery('#exp-filter .form-item input').removeAttr('checked');

            // disable all buttons zone
            jQuery('#experienceButtons .row div ul:last li a').parent('li').addClass('disabled');

            // update selector by zone and bottom filter checkbox by zone
            var counterItemsActive = 0;
            jQuery('.resultsProjects .container .row div .row .tab-pane').each(function(index) {
                if ( jQuery(this).hasClass('active') ) {
                    counterItemsActive++;
                    var zoneValue = jQuery(this).attr('zone');
                    //console.log('updateZonesByExperience zoneValue = ' + zoneValue);
                    jQuery('#experienceButtons .row div ul:last li a[href=".'+ zoneValue + '"]').parent('li').addClass('active');
                    jQuery('#experienceButtons .row div ul:last li a[href=".'+ zoneValue + '"]').parent('li').removeClass('disabled');
                    jQuery('#exp-filter .form-item input[name='+ zoneValue + ']').prop('checked', true);
                    jQuery('#exp-filter .form-item input[name='+ zoneValue + ']').attr('checked', true);
                }
            });
            disable_checkbox();
            if (counterItemsActive == 0) {
                // enable all buttons zone
                jQuery('#experienceButtons .row div ul:last li a').parent('li').removeClass('disabled');
            }
        }


        function updateZonesByExperience2(priority) {

            if (priority) {
                // first click by experience

                // disable all buttons zone
                jQuery('.column-selectors #second-selector li a').addClass('disabled');

                // reset zone selectors
                jQuery('.column-selectors #second-selector li a').removeClass('active');
                jQuery('.column-selectors #second-selector li a .item-list').removeClass('active');

                // update selector by zone and bottom filter checkbox by zone
                var counterItemsActive = 0;
                jQuery('.resultsProjects .container .row div .row .tab-pane').each(function(index) {
                    if ( jQuery(this).hasClass('active') ) {
                        counterItemsActive++;
                        var zoneValue = jQuery(this).attr('zone');
                        //console.log('updateZonesByExperience zoneValue = ' + zoneValue);
                        jQuery('.column-selectors #second-selector li a[href=".'+ zoneValue + '"]').addClass('active');
                        jQuery('.column-selectors #second-selector li a[href=".'+ zoneValue + '"]').removeClass('disabled');
                        jQuery('.column-selectors #second-selector li a[href=".'+ zoneValue + '"]').children('.item-list').addClass('active');
                        jQuery('#exp-filter .form-item input[name='+ zoneValue + ']').prop('checked', true);
                        jQuery('#exp-filter .form-item input[name='+ zoneValue + ']').attr('checked', true);
                    }
                });
            } else {

            }
        }

        function hasWhitespace(text) {
            return /\s/g.test(text);
        }

        function updateExperienceByZones2(priority) {

            if (priority) {
                // first click by zone

                // disable all buttons by experience
                jQuery('.column-selectors #first-selector li a').addClass('disabled');

                // reset experience selectors
                jQuery('.column-selectors #first-selector li a').removeClass('active');
                jQuery('.column-selectors #first-selector li a .item-list').removeClass('active');

                // update selector by zone and bottom filter checkbox by zone
                var counterItemsActive = 0;
                jQuery('.resultsProjects .container .row div .row .tab-pane').each(function(index) {
                    if ( jQuery(this).hasClass('active') ) {
                        counterItemsActive++;
                        var experienceValue = jQuery(this).attr('experience');
                        if (hasWhitespace(experienceValue)) {
                            // multiple experiences
                            var array = experienceValue.split(" ");
                            jQuery.each(array,function(i){
                                jQuery('.column-selectors #first-selector li a[href=".'+ array[i] + '"]').addClass('active');
                                jQuery('.column-selectors #first-selector li a[href=".'+ array[i] + '"]').removeClass('disabled');
                                jQuery('.column-selectors #first-selector li a[href=".'+ array[i] + '"]').children('.item-list').addClass('active');
                            });
                        } else {
                            // only one experience
                            jQuery('.column-selectors #first-selector li a[href=".'+ experienceValue + '"]').addClass('active');
                            jQuery('.column-selectors #first-selector li a[href=".'+ experienceValue + '"]').removeClass('disabled');
                            jQuery('.column-selectors #first-selector li a[href=".'+ experienceValue + '"]').children('.item-list').addClass('active');
                        }
                    }
                });


            } else {
                // first click by experience
            }
        }	// end function


        function checkCeroSelects(selector) {

            var length = jQuery(selector + ' li a.active').length;

            if(length == 0) {
                // reset search;
                jQuery('.new-search a.reset-new-search').click();
            }

            return false;

        }	// end function


        function updateHiddenSelectors() {

            // clear old results
            jQuery('#accordionExperience .contentItems p').remove();
            jQuery('#accordionZone .contentItems p').remove();

            // check and set active experience
            jQuery('#first-selector li a').each(function(index) {
                var isActive = jQuery(this).hasClass('active');
                if (isActive) {
                    jQuery('#accordionExperience .contentItems').append('<p><span class="text">' + jQuery(this).text() + '</span></p>')
                }
            });

            // check and set active zones
            jQuery('#second-selector li a').each(function(index) {
                var isActive = jQuery(this).hasClass('active');
                if (isActive) {
                    jQuery('#accordionZone .contentItems').append('<p><span class="text">' + jQuery(this).text() + '</span></p>')
                }
            });

        }	// end function


        // init carousel projects
        if ( jQuery('#carouselProject').length ) {
            // update first time carousel counter slides
            updateCarouselCounter('#carouselProject');

            jQuery('#carouselProject').carousel({
                interval: false
            });

            jQuery('#carouselProject .carousel-control.left').click(function() {
                jQuery('#carouselProject').carousel('prev');
            });

            jQuery('#carouselProject .carousel-control.right').click(function() {
                jQuery('#carouselProject').carousel('next');
            });

            // his event is fired when the carousel has completed its slide transition.
            jQuery('#carouselProject').on('slid.bs.carousel', function () {
                updateCarouselCounter('#carouselProject');
            });
        }

        // projects new design
        if ( jQuery('.exp-select2').length ) {

            // update text results
            updateCounter();

            // show fists load projects (highlights)
            jQuery('#experienceOverview .column-results .tab-pane.highlight').addClass('active');

            // set limits to show/hide side fixed indicators
            var headerHeight = parseInt(jQuery('#header').height()) + 10;
            var limitFoofer = parseInt(jQuery('.footer').offset().top) - headerHeight;

            var selectorTopPosition = parseInt(jQuery('.fixedDiv').offset().top) - parseInt(jQuery('#header').height());
            var columnWidth = parseInt(jQuery('.fixedDiv').width()) + 'px';

            // control scroll fixed left side
            jQuery(window).scroll(function() {

                var column = jQuery('.fixedDiv');
                var position = column.offset();
                var heightColumnLeft = jQuery('.fixedDiv').height();
                var windowHeight = jQuery(window).height();
                var columnWidth = jQuery('.fixedDiv').width();
                var conDif = 210; // up to hide before / down to hide after
                var pointToShow = (position.top + heightColumnLeft) - (windowHeight / 2) + conDif;
                var footer = jQuery('.footer');
                var positionFooter = footer.offset();
                var topFooter = positionFooter.top;
                var maxHeight = (topFooter - (windowHeight / 2)) - 100;

                // only md and lg
                var windowScreen = jQuery(window).width();
                if (windowScreen > 991){
                    jQuery('.accordion').css('width', columnWidth);

                    if( jQuery(this).scrollTop() > pointToShow && jQuery(this).scrollTop() < maxHeight ){
                        jQuery('.accordion').fadeIn();
                    } else {
                        jQuery('.accordion').fadeOut();
                    }
                }

            });

            // click select by experience
            jQuery(document).on('click', '.selectors-group #first-selector li a.selector-exp', function(event){
                event.preventDefault();

                // if button is disabled
                if ( jQuery(this).hasClass('disabled') ) { return false; }

                // add/remove active button
                var hrefValue = jQuery(this).attr('href');

                // set/check priority by experience or by zone
                if ( jQuery('#first-selector').hasClass('priority') || jQuery('#first-selector').hasClass('no-priority')) {
                    // no first click
                    if (jQuery('#first-selector').hasClass('priority')) {
                        var priority = true;
                    } else {
                        var priority = false;
                    }
                } else {
                    // first click
                    jQuery('#first-selector').addClass('priority');
                    jQuery('#second-selector').addClass('no-priority');
                    var priority = true;
                }



                // update selectors and show/hide new results
                if (jQuery(this).children('.item-list').hasClass('active')) {
                    jQuery(this).children('.item-list').removeClass('active');
                    jQuery(this).children('.item-list').addClass('no-active');
                    jQuery(this).removeClass('active');
                    //jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).removeClass('active');

                    if (priority) {
                        // hide all results
                        jQuery('.column-results .tab-pane').removeClass('active');

                        // show all results selected
                        jQuery('.selectors-group #first-selector li a.selector-exp').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var experienceValue = jQuery(this).attr('href');
                                jQuery('#experienceOverview .column-results .tab-pane'+ experienceValue).addClass('active');
                            }
                        });

                        updateZonesByExperience2(priority);

                    }	else {

                        jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).removeClass('active');

                        // show all results selected
                        jQuery('.selectors-group #first-selector li a.selector-exp').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var experienceValue = jQuery(this).attr('href');
                                jQuery('#experienceOverview .column-results .tab-pane'+ experienceValue).addClass('active');
                            }
                        });
                        updateZonesByExperience2(priority);
                    }

                    // hide zones not selected
                    jQuery('.selectors-group #second-selector li a.selector-zone').each(function(index) {
                        if ( !jQuery(this).hasClass('active') ) {
                            var zoneValue = jQuery(this).attr('href');
                            jQuery('#experienceOverview .column-results .tab-pane'+ zoneValue).removeClass('active');
                        }
                    });

                } else {
                    jQuery(this).children('.item-list').removeClass('no-active');
                    jQuery(this).children('.item-list').addClass('active');
                    jQuery(this).addClass('active');
                    // jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).addClass('active');

                    if (priority) {
                        // hide all results
                        jQuery('.column-results .tab-pane').removeClass('active');

                        // show all results selected
                        jQuery('.selectors-group #first-selector li a.selector-exp').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var experienceValue = jQuery(this).attr('href');
                                jQuery('#experienceOverview .column-results .tab-pane'+ experienceValue).addClass('active');
                            }
                        });

                        updateZonesByExperience2(priority);

                    }	else {
                        updateZonesByExperience2(priority);
                        jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).addClass('active');
                    }

                    // hide zones not selected
                    jQuery('.selectors-group #second-selector li a.selector-zone').each(function(index) {
                        if ( !jQuery(this).hasClass('active') ) {
                            var zoneValue = jQuery(this).attr('href');
                            jQuery('#experienceOverview .column-results .tab-pane'+ zoneValue).removeClass('active');
                        }
                    });

                }

                /*
                 if (priority) {
                 updateZonesByExperience2(priority);
                 }*/

                updateCounter();
                updateHiddenSelectors();

                // update other buttons
                jQuery('.show-first-select').css('visibility', 'hidden').css('opacity', '0').hide();
                jQuery('.show-text-results').css('visibility', 'visible').css('opacity', '1').show();
                jQuery('.selectors-group.new-search a').css('visibility', 'visible').css('opacity', '1');
                jQuery('.new-search a').css('visibility', 'visible').css('opacity', '1');

                // check if cero selectors
                checkCeroSelects('#first-selector');

                return false;
            });

            // click select by zone
            jQuery(document).on('click', '.selectors-group #second-selector li a.selector-zone', function(event){
                event.preventDefault();

                // if button is disabled
                if ( jQuery(this).hasClass('disabled') ) { return false; }

                // add/remove active button
                var hrefValue = jQuery(this).attr('href');
                var zoneValue = hrefValue.substring(1, hrefValue.length);

                // set/check priority by experience or by zone
                if ( jQuery('#second-selector').hasClass('priority') || jQuery('#second-selector').hasClass('no-priority')) {
                    // no first click
                    if (jQuery('#second-selector').hasClass('priority')) {
                        var priority = true;
                    } else {
                        var priority = false;
                    }
                } else {
                    // first click
                    jQuery('#first-selector').addClass('no-priority');
                    jQuery('#second-selector').addClass('priority');
                    var priority = true;
                }

                // update selectors and show/hide new results
                if (jQuery(this).children('.item-list').hasClass('active')) {
                    // hide items this zone
                    jQuery(this).children('.item-list').removeClass('active');
                    jQuery(this).children('.item-list').addClass('no-active');
                    jQuery(this).removeClass('active');

                    if (priority) {
                        // hide all results
                        jQuery('.column-results .tab-pane').removeClass('active');

                        // show all results selected
                        jQuery('.selectors-group #second-selector li a.selector-zone').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var zoneValue = jQuery(this).attr('href');
                                jQuery('#experienceOverview .column-results .tab-pane'+ zoneValue).addClass('active');
                            }
                        });

                        updateExperienceByZones2(priority);

                    } else {	// no priority
                        jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).removeClass('active');
                    }

                    // hide experiences not selected
                    jQuery('.selectors-group #first-selector li a.selector-exp').each(function(index) {
                        if ( !jQuery(this).hasClass('active') ) {
                            var experienceValue = jQuery(this).attr('href');
                            jQuery('#experienceOverview .column-results .tab-pane'+ experienceValue).removeClass('active');
                        }
                    });


                } else {
                    // show items this zone
                    jQuery(this).children('.item-list').removeClass('no-active');
                    jQuery(this).children('.item-list').addClass('active');
                    jQuery(this).addClass('active');
                    //jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).addClass('active');

                    if (priority) {
                        // hide all results
                        jQuery('.column-results .tab-pane').removeClass('active');

                        // show all results selected
                        jQuery('.selectors-group #second-selector li a.selector-zone').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var zoneValue = jQuery(this).attr('href');
                                jQuery('#experienceOverview .column-results .tab-pane'+ zoneValue).addClass('active');
                            }
                        });

                        updateExperienceByZones2(priority);

                    } else {
                        jQuery('#experienceOverview .column-results .tab-pane'+ hrefValue).addClass('active');
                    }

                    // hide experiences not selected
                    jQuery('.selectors-group #first-selector li a.selector-exp').each(function(index) {
                        if ( !jQuery(this).hasClass('active') ) {
                            var experienceValue = jQuery(this).attr('href');
                            jQuery('#experienceOverview .column-results .tab-pane'+ experienceValue + '[zone!="' + zoneValue + '"]').removeClass('active');
                        }
                    });

                }

                /*
                 if (priority) {
                 updateExperienceByZones2(priority);
                 }*/
                updateCounter();
                updateHiddenSelectors();

                // update other buttons
                jQuery('.show-first-select').css('visibility', 'hidden').css('opacity', '0').hide();
                jQuery('.show-text-results').css('visibility', 'visible').css('opacity', '1').show();
                jQuery('.selectors-group.new-search a').css('visibility', 'visible').css('opacity', '1');
                jQuery('.new-search a').css('visibility', 'visible').css('opacity', '1');

                // check if cero selectors
                checkCeroSelects('#second-selector');

                return false;
            });

            // click new search
            jQuery(document).on('click', '.new-search a', function(event){
                event.preventDefault();

                // reset first selector
                jQuery('#first-selector li a').removeClass('active');
                jQuery('#first-selector li a').removeClass('disabled');
                jQuery('#first-selector li a span').removeClass('active');

                // reset second selector
                jQuery('#second-selector li a').removeClass('active');
                jQuery('#second-selector li a').removeClass('disabled');
                jQuery('#second-selector li a span').removeClass('active');

                // reset priority
                jQuery('#first-selector').removeClass('priority').removeClass('no-priority');
                jQuery('#second-selector').removeClass('priority').removeClass('no-priority');

                // hide all results
                jQuery('.column-results .tab-pane').removeClass('active');

                // show select text and hide text results
                jQuery('.show-first-select').css('visibility', 'visible').css('opacity', '1').show();
                jQuery('.show-text-results').css('visibility', 'hidden').css('opacity', '0').hide();


                // hide buttons new search
                jQuery('.selectors-group.new-search a').css('visibility', 'hidden').css('opacity', '0');
                jQuery('.new-search a').css('visibility', 'hidden').css('opacity', '0');

                // show fists load projects (highlights)
                jQuery('#experienceOverview .column-results .tab-pane.highlight').addClass('active');

                // scroll to new search
                var headerHeight = jQuery('#header').height();
                target = jQuery('.exp-select2');
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);

                return false;
            });

            // click go to selectors
            jQuery(document).on('click', '.go-to-selectors a', function(event){
                event.preventDefault();

                // scroll to new search
                var headerHeight = jQuery('#header').height();
                target = jQuery('.exp-select2');
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);

                return false;
            });

            // mobile click filter finder
            jQuery('#filterSelectors button').on('click', function(event){
                event.preventDefault();

                var screenHeight = jQuery(window).height();
                var buttonBottom = jQuery(this).parent().css('bottom');
                var buttomHeight = jQuery(this).parent().height();

                if ( buttonBottom == '0px' ) {
                    jQuery(this).parent().css('bottom', 'auto');

                    // move button
                    jQuery(this).parent().animate({
                        top: 0
                        //bottom: screenHeight - buttomHeight
                    });
                    // animate arrow
                    jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateZero');
                    jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateHalf');

                    // show filters
                    jQuery('.mobilebg').show();
                    jQuery('.fixedDiv').fadeIn();
                    jQuery('.selectors-group').fadeIn();

                    // show button find
                    jQuery('.mobileFilterClose').fadeIn();
                } else {

                    // hide filters
                    jQuery('.mobilebg').hide();
                    jQuery('.fixedDiv').fadeOut();
                    jQuery('.selectors-group').fadeOut();

                    jQuery(this).parent().css('top', 'auto');
                    // move button
                    jQuery(this).parent().animate({
                        bottom: 0
                    });
                    // animate arrow
                    jQuery(this).children('.mobile-only').children('.arrowUp').removeClass('animated rotateHalf');
                    jQuery(this).children('.mobile-only').children('.arrowUp').addClass('animated rotateZero');

                }
                return false
            });

            // mobile click filter finder find
            jQuery('#filterSelectorsClose button').on('click', function(event){
                event.preventDefault();
                jQuery('#filterSelectors button').click();
                return false
            });

            // mobile click tab selectors
            jQuery('a.buttonDropdown').on('click', function(event){
                event.preventDefault();
                console.log('click ' + jQuery(this).attr('href'));
                var idTarget = jQuery(this).attr('href');
                if ( jQuery(idTarget).hasClass('listopen') ){
                    // close this dropdown
                    jQuery(idTarget).slideUp();
                    jQuery(idTarget).removeClass('listopen');

                } else {
                    // close others
                    jQuery('.dropdownlist').slideUp();
                    jQuery('.dropdownlist').removeClass('listopen');
                    // show selected
                    jQuery(idTarget).slideDown();
                    jQuery(idTarget).addClass('listopen');
                }

                return false
            });

            // capture url parameter to select zone or experience
            var paramExperience = GetURLParameter('experience');
            if ( paramExperience != "" && typeof paramExperience != 'undefined') {
                // has param
                //console.log('slplfunctions2ready.js paramExperience = ' + paramExperience);
                jQuery('#first-selector li a[href=".' + paramExperience + '"]').click();
            }

            var paramZone = GetURLParameter('zone');
            if ( paramZone != "" && typeof paramZone != 'undefined') {
                // has param
                //console.log('slplfunctions2ready.js paramZone = ' + paramZone);
                jQuery('#second-selector li a[href=".' + paramZone + '"]').click();
            }

        }

        // projects old controls
        if ( jQuery('.exp-select').length ) {

            // update text results
            updateCounter();

            // click select by experience
            jQuery('#experienceButtons .row div ul:first li a').on('click', function(event){
                event.preventDefault();

                // add/remove active button
                var hrefValue = jQuery(this).attr('href');
                //console.log('click in hrefValue = ' + hrefValue);
                if (jQuery(this).parent('li').hasClass('active') ) {
                    jQuery(this).parent('li').removeClass('active');
                    jQuery(this).parent('li').addClass('no-active');
                    jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).removeClass('active');
                } else {
                    jQuery(this).parent('li').removeClass('no-active');
                    jQuery(this).parent('li').addClass('active');
                    jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).addClass('active');
                }

                // hide all items
                jQuery('#experienceOverview .resultsProjects .tab-pane').removeClass('active');

                // show items experience active
                var counterExperiencesActive = 0;
                jQuery('#experienceButtons .row div ul:first li').each(function(index) {
                    if ( jQuery(this).hasClass('active') ) {
                        counterExperiencesActive++;
                        var hrefValue = jQuery(this).children().attr('href');
                        jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).addClass('active');
                    }
                });

                // update selector by zone and bottom filter checkbox by zone
                updateZonesByExperience();

                // update text results
                updateCounter();

                //var counterZonesActive = jQuery('#experienceButtons .row div ul:last li.active').size();

                if ( counterExperiencesActive > 0 ) {
                    // scroll to results
                    scrollToResults();

                    // show footer filter by zone
                    jQuery('#exp-filter').fadeIn();
                } else {
                    // hide footer filter by zone
                    jQuery('#exp-filter').fadeOut();
                }


            });

            // click select by zone
            jQuery('#experienceButtons .row div ul:last li a').on('click', function(event){
                event.preventDefault();

                // if button is disabled
                if ( jQuery(this).parent().hasClass('disabled') ) {
                    return false;
                }

                // add/remove active button
                var hrefValue = jQuery(this).attr('href');
                var refValue = hrefValue.substring(1,hrefValue.length);
                //console.log('selector button zones :: click in hrefValue = ' + hrefValue + ' refValue = ' + refValue);
                if (jQuery(this).parent('li').hasClass('active') ) {
                    var action = 'deactivate';
                    jQuery(this).parent('li').removeClass('active');
                    jQuery(this).parent('li').addClass('no-active');
                    jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).removeClass('active');
                    jQuery('#exp-filter .form-item input[name='+ refValue + ']').prop('checked', false);
                    jQuery('#exp-filter .form-item input[name='+ refValue + ']').removeAttr('checked');
                } else {
                    var action = 'activate';
                    jQuery(this).parent('li').removeClass('no-active');
                    jQuery(this).parent('li').addClass('active');
                    jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).addClass('active');
                    jQuery('#exp-filter .form-item input[name='+ refValue + ']').prop('checked', true);
                    jQuery('#exp-filter .form-item input[name='+ refValue + ']').attr('checked', true);
                }

                var experienceSelected = jQuery('#experienceButtons .row div ul:first li.active').size();

                if ( experienceSelected == 0 ) {
                    // hide all items
                    jQuery('#experienceOverview .resultsProjects .tab-pane').removeClass('active');

                    // show items experience active
                    jQuery('#experienceButtons .row div ul:first li').each(function(index) {
                        if ( jQuery(this).hasClass('active') ) {
                            var hrefValue = jQuery(this).children().attr('href');
                            jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).addClass('active');
                        }
                    });

                    jQuery('#experienceButtons .row div ul:last li').each(function(index) {
                        if ( jQuery(this).hasClass('active') ) {
                            var hrefValue = jQuery(this).children().attr('href');
                            jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue).addClass('active');
                        }
                    });
                } else {
                    if (action == 'activate'){
                        jQuery('#experienceButtons .row div ul:first li').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var hrefValue = jQuery(this).children().attr('href');
                                jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue + '.' + refValue).addClass('active');
                            }
                        });
                    } else {
                        jQuery('#experienceButtons .row div ul:first li').each(function(index) {
                            if ( jQuery(this).hasClass('active') ) {
                                var hrefValue = jQuery(this).children().attr('href');
                                jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue + '.' + refValue).removeClass('active');
                            }
                        });
                    }
                }


                // update text results
                updateCounter();

                var counterZonesActive = jQuery('#experienceButtons .row div ul:last li.active').size();
                if ( counterZonesActive > 0 || experienceSelected > 0 ) {
                    // scroll to results
                    scrollToResults();
                } else {
                    // hide footer filter by zone
                    jQuery('#exp-filter').fadeOut();
                }

            });

            // click bottom filter by zone checkbox
            jQuery('#exp-filter .form-item input[type=checkbox]').change (function(){
                var thisCheck = jQuery(this);
                var nameValue = jQuery(this).attr('name');

                if ( thisCheck.is(':checked') ) {
                    // is check
                    //console.log('checkbox = ' + thisCheck.attr("name") + ' is :checked');
                    // update items results to show
                    jQuery('#experienceButtons .row div ul:first li').each(function(index) {
                        if ( jQuery(this).hasClass('active') ) {
                            var hrefValue = jQuery(this).children().attr('href');
                            jQuery('#experienceOverview .resultsProjects .tab-pane'+ hrefValue + '.' + nameValue).addClass('active');
                        }
                    });

                    // update zone selectors
                    jQuery('#experienceButtons .row div ul:last li a[href=".' + nameValue + '"]').parent().addClass('active');
                } else {	// is not check
                    //console.log('checkbox = ' + thisCheck.attr("name") + ' is NOT :checked');
                    // update items results to show
                    jQuery('#experienceOverview .resultsProjects .tab-pane.'+ nameValue).removeClass('active');

                    // update zone selectors
                    jQuery('#experienceButtons .row div ul:last li a[href=".' + nameValue + '"]').parent().removeClass('active');
                }

                updateCounter();
                scrollToResults();
            });

            // click new search button
            jQuery('#newSearch').on('click', function(event){
                event.preventDefault();

                // hide bottom filter by zone
                jQuery('#collapseFilters').removeClass('in');
                jQuery('#exp-filter h3.collapseFiltersTitle .hide-filter-text').hide();
                jQuery('#exp-filter h3.collapseFiltersTitle .show-filter-text').show();

                // clear experience selector
                jQuery('#experienceButtons .row div ul:first li').removeClass('active');
                jQuery('#experienceButtons .row div ul:first li').removeClass('no-active');

                // clear zone selector
                jQuery('#experienceButtons .row div ul:last li').removeClass('active');
                jQuery('#experienceButtons .row div ul:last li').removeClass('no-active');
                jQuery('#experienceButtons .row div ul:last li').removeClass('disabled');

                // clear checkbox zone selector
                jQuery('#exp-filter .form-item').removeClass('disable');
                jQuery('#exp-filter .form-item input').prop('checked', false);
                jQuery('#exp-filter .form-item input').removeAttr('checked');

                // hide all items
                jQuery('#experienceOverview .resultsProjects .tab-pane').removeClass('active');

                // update text results
                updateCounter();

                // hide footer filter by zone
                jQuery('#exp-filter').fadeOut();

                // scroll to buttons select Area
                var headerHeight = jQuery('#header').height();
                target = jQuery('.exp-select');
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);

            });

            // on show bottom filter by zone
            jQuery('#collapseFilters').on('show.bs.collapse', function () {
                jQuery('#exp-filter h3.collapseFiltersTitle .show-filter-text').hide();
                jQuery('#exp-filter h3.collapseFiltersTitle .hide-filter-text').show();
            });

            // on show bottom filter by zone
            jQuery('#collapseFilters').on('hide.bs.collapse', function () {
                jQuery('#exp-filter h3.collapseFiltersTitle .hide-filter-text').hide();
                jQuery('#exp-filter h3.collapseFiltersTitle .show-filter-text').show();
            });

            // capture url parameter to select zone or experience
            var paramExperience = GetURLParameter('experience');
            if ( paramExperience != "" && typeof paramExperience != 'undefined') {
                // has param
                console.log('slplfunctions2ready.js paramExperience = ' + paramExperience);
                jQuery('#experienceButtons .row div #first-selector li a[href=".' + paramExperience + '"]').click();
            }

            var paramZone = GetURLParameter('zone');
            if ( paramZone != "" && typeof paramZone != 'undefined') {
                // has param
                console.log('slplfunctions2ready.js paramZone = ' + paramZone);
                jQuery('#experienceButtons .row div #second-selector li a[href=".' + paramZone + '"]').click();
            }

        }

    }		// end if id=experienceOverview


    if ( jQuery('body').attr('id') == 'experienceDetail' ) {

        // init scrollbar in related products
        if ( jQuery('#relatedProducts_list').length ) {
            if ( jQuery('#relatedProducts_list').hasClass('mCustomScrollbar') ) {
                jQuery('#relatedProducts_list').mCustomScrollbar('update');
            } else {
                jQuery('#relatedProducts_list').mCustomScrollbar({
                    axis:'x',
                    horizontalScroll:true,
                    autoExpandScrollbar:true,
                    advanced:{autoExpandHorizontalScroll:true},
                    scrollButtons:{enable:false}
                });
            }

            // click related products buttons mobile
            jQuery('#relatedProducts_list ol.hl-indicators li').on('click', function(event){
                event.preventDefault();
                var dataTarget = jQuery(this).attr('data-target');
                var dataSlideTo = parseInt(jQuery(this).attr('data-slide-to'));
                var itemActive = jQuery('#relatedProducts_list ul li.active').index();
                //console.log('dataTarget = ' + dataTarget + ' dataSlideTo = ' + dataSlideTo + ' itemActive = ' + itemActive);
                if ( itemActive != dataSlideTo ) {
                    // change slide
                    jQuery('#relatedProducts_list ul li.active').addClass('animated fadeOut');
                    jQuery('#relatedProducts_list ul li.active').removeClass('active animated fadeIn fadeOut');
                    jQuery('#relatedProducts_list ul li:eq(' +  dataSlideTo + ')').addClass('active animated fadeIn');
                    // update indicators
                    jQuery('#relatedProducts_list ol.hl-indicators li').removeClass('active');
                    jQuery('#relatedProducts_list ol.hl-indicators li:eq(' +  dataSlideTo + ')').addClass('active');
                }
            });
        }

        // init carousel products
        if ( jQuery('#carousel-process').length ) {
            jQuery('#carousel-process').carousel({
                interval: false
            });

            jQuery('#carousel-process .carousel-control.left').click(function() {
                jQuery('#carousel-process').carousel('prev');
            });

            jQuery('#carousel-process .carousel-control.right').click(function() {
                jQuery('#carousel-process').carousel('next');
            });

        }

        // init carousel products
        if ( jQuery('#carouselProject').length ) {
            // update first time carousel counter slides
            updateCarouselCounter('#carouselProject');

            jQuery('#carouselProject').carousel({
                interval: false
            });

            jQuery('#carouselProject .carousel-control.left').click(function() {
                jQuery('#carouselProject').carousel('prev');
            });

            jQuery('#carouselProject .carousel-control.right').click(function() {
                jQuery('#carouselProject').carousel('next');
            });

            // his event is fired when the carousel has completed its slide transition.
            jQuery('#carouselProject').on('slid.bs.carousel', function () {
                updateCarouselCounter('#carouselProject');
            });
        }

    }		// end if id=experienceDetail


    if ( jQuery('body').attr('id') == 'newsOverview' ) {

        var totalPages = jQuery('.news .news-page').size();

        jQuery('.news-pagination').bootpag({
            total: totalPages,	// total pages
            page: 1,						// page to show on start
            leaps: false,			// next/prev buttons move over one page or maximum visible pages
            maxVisible: 10
        }).on('page', function(event, num){ // event: on page click, num: page number clicked
            //jQuery(".content2").html("Page " + num); // or some ajax content loading...
            var newPage = num - 1;
            jQuery('.news .news-page').removeClass('active');
            jQuery('.news .news-page:eq(' + newPage + ')').addClass('active');
            // update item pagination
            jQuery('.pagination li').removeClass('active');
            jQuery('.pagination li[data-lp=' + num + ']').addClass('active');
            jQuery('.pagination li.prev').removeClass('active');
            jQuery('.pagination li.next').removeClass('active');

        });

        // update item pagination onload page
        jQuery('.pagination li[data-lp=1]:last').addClass('active');

    }	// end if id=newsOverview


    if ( jQuery('body').attr('id') == 'press' ) {

        var totalPages = jQuery('.press .press-page').size();

        jQuery('.news-pagination').bootpag({
            total: totalPages,
            page: 1,
            leaps: false,
            maxVisible: 10
        }).on('page', function(event, num){
            //jQuery(".content2").html("Page " + num); // or some ajax content loading...
            var newPage = num - 1;
            jQuery('.press .press-page').removeClass('active');
            jQuery('.press .press-page:eq(' + newPage + ')').addClass('active');
            // update item pagination
            jQuery('.pagination li').removeClass('active');
            jQuery('.pagination li[data-lp=' + num + ']').addClass('active');
            jQuery('.pagination li.prev').removeClass('active');
            jQuery('.pagination li.next').removeClass('active');

        });

        // update item pagination onload page
        jQuery('.pagination li[data-lp=1]:last').addClass('active');

    }	// end if id=press


    if ( jQuery('body').attr('id') == 'inspiration' ) {

        // init select tab
        if ( jQuery('#select-tab').length ) {

            var windowWidth = jQuery(window).width();

            if ( windowWidth > 991 ) {

                if (!jQuery('#select-tab').hasClass('edit-mode') ) {
                    // make dropdown others
                    var widthSelectTab = jQuery('#select-tab').width();
                    var items = jQuery('#select-tab li').size();

                    // total items width
                    var totalWidth = 0;
                    var counterItemsTop = 0;
                    var maxItemOnTop = 0;
                    var widthItemMore = jQuery('#select-tab > li.dropdown').width();
                    jQuery('#select-tab > li').each(function(index) {
                        if ( !jQuery(this).hasClass('dropdown') ) {
                            totalWidth = parseInt(totalWidth + jQuery(this).width() + 20);
                            counterItemsTop = counterItemsTop + 1;
                            if ( totalWidth > (widthSelectTab - widthItemMore)) {
                                if ( maxItemOnTop == (counterItemsTop - 1) ) {
                                    maxItemOnTop = counterItemsTop - 2;
                                }
                            } else {
                                maxItemOnTop = counterItemsTop;
                            }
                        }
                    });

                    if ( totalWidth > (widthSelectTab - widthItemMore) ) {
                        // create dropdown list
                        var counterItems = 0;
                        jQuery('#select-tab > li').each(function(index) {
                            if ( counterItems >= maxItemOnTop ) {
                                if ( !jQuery(this).hasClass('dropdown') ) {
                                    var myItem = jQuery(this).detach();
                                    myItem.appendTo('#select-tab li.dropdown ul.dropdown-menu');
                                }
                            }
                            counterItems++;
                        });
                        // show dropdown
                        jQuery('#select-tab li.dropdown').css('display', 'table-cell');
                    }

                    // add correct style list
                    jQuery('.inspiration-tabs > li').css('width', '1%');

                }	// end hasClass edit-mode


                // select first item
                jQuery(function () {
                    jQuery('#select-tab a:first').tab('show');
                    jQuery('#collapse-inspiration ul li.dropdown ul.dropdown-menu li:first').tab('show');
                });

            }	// end windowWidth > 991

            // control descktop menu
            jQuery('#select-tab a').click(function (e) {
                e.preventDefault();
                jQuery(this).tab('show');
                // update mobile list
                var valueSelected = jQuery(this).attr('href');
                jQuery('#collapse-inspiration .dropdown-menu li').removeClass('active');
                jQuery('#collapse-inspiration .dropdown-menu li a[href="' + valueSelected + '"]').parent('li').addClass('active');
            });

            // control mobile menu
            jQuery('#collapse-inspiration .dropdown-menu li a').click(function (e) {
                e.preventDefault();
                // update descktop list
                var valueSelected = jQuery(this).attr('href');
                console.log('click en = ' + valueSelected);
                jQuery('#select-tab li').removeClass('active');
                jQuery('#select-tab li a[href="' + valueSelected + '"]').parent('li').addClass('active');
            });

        }	// end exist #select-tab

    }	// end if id=inspiration


    if ( jQuery('body').attr('id') == 'videos' ) {

        if ( jQuery('.embed-responsive-item').length ) {

            // create video meta tags
            jQuery('iframe.embed-responsive-item').each(function(index) {
                var idContentVideo = "#" + jQuery(this).attr('id');
                var videoUrl = jQuery(this).attr('src');
                if (videoUrl.indexOf("youtube") > -1) {
                    var videoUrl_array = videoUrl.split('/');
                    var videoid = videoUrl_array[videoUrl_array.length-1];
                    if ( videoid.indexOf("?") > -1) {
                        var videoid = videoid.substring(0, videoid.indexOf("?")-1);
                    }
                    // create tag duration
                    getYoutubeDuration(videoid, idContentVideo);
                    // create tag description, publishedAt and thumbnailUrl
                    getYoutubeData(videoid, idContentVideo);
                }

                if (videoUrl.indexOf('vimeo') > -1 ) {
                    // create tag duration, description and thumbnailUrl
                    getVimeoData(videoUrl, idContentVideo);
                }
            });

        }

        if ( jQuery('#select-tab').length ) {

            if (!jQuery('#select-tab').hasClass('edit-mode') ) {
                // make dropdown others
                var widthSelectTab = jQuery('#select-tab').width();
                var items = jQuery('#select-tab li').size();

                // total items width
                var totalWidth = 0;
                var counterItemsTop = 0;
                var maxItemOnTop = 0;
                var widthItemMore = jQuery('#select-tab > li.dropdown').width();
                jQuery('#select-tab > li').each(function(index) {
                    if ( !jQuery(this).hasClass('dropdown') ) {
                        totalWidth = parseInt(totalWidth + jQuery(this).width() + 20);
                        counterItemsTop = counterItemsTop + 1;
                        if ( totalWidth > (widthSelectTab - widthItemMore)) {
                            if ( maxItemOnTop == (counterItemsTop - 1) ) {
                                maxItemOnTop = counterItemsTop - 2;
                            }
                        } else {
                            maxItemOnTop = counterItemsTop;
                        }
                    }
                });

                if ( totalWidth > (widthSelectTab - widthItemMore) ) {
                    // create dropdown list
                    var counterItems = 0;
                    jQuery('#select-tab > li').each(function(index) {
                        if ( counterItems >= maxItemOnTop ) {
                            if ( !jQuery(this).hasClass('dropdown') ) {
                                var myItem = jQuery(this).detach();
                                myItem.appendTo('#select-tab li.dropdown ul.dropdown-menu');
                            }
                        }
                        counterItems++;
                    });
                    // show dropdown
                    jQuery('#select-tab li.dropdown').css('display', 'table-cell');
                }

                // add correct style list
                jQuery('.inspiration-tabs > li').css('width', '1%');

            }	// end hasClass edit-mode

            var windowWidth = jQuery(window).width();

            // always do, before only > 991
            if ( windowWidth > 0 ) {

                // select first item
                jQuery(function () {
                    jQuery('#select-tab a:first').tab('show');
                    jQuery('#collapse-inspiration ul li.dropdown ul.dropdown-menu li:first').tab('show');

                    // capture url parameter to select zone or experience
                    var paramCategory = GetURLParameter('category');
                    if ( paramCategory != "" && typeof paramCategory != 'undefined') {
                        // has param
                        //console.log('slplfunctions2ready.js paramCategory = ' + paramCategory);
                        jQuery('#select-tab a[href=".' + paramCategory + '"]').tab('show');
                        jQuery('#collapse-inspiration ul li.dropdown ul.dropdown-menu li a[href=".' + paramCategory + '"]').tab('show');
                    }
                });

            }	// end windowWidth > 991

            // control descktop menu
            jQuery('#select-tab a').click(function (e) {
                e.preventDefault();
                jQuery(this).tab('show');
                // update mobile list
                var valueSelected = jQuery(this).attr('href');
                console.log('click href = ' + valueSelected);
                jQuery('#collapse-inspiration .dropdown-menu li').removeClass('active');
                jQuery('#collapse-inspiration .dropdown-menu li a[href="' + valueSelected + '"]').parent('li').addClass('active');
            });

            // control mobile menu
            jQuery('#collapse-inspiration .dropdown-menu li a').click(function (e) {
                e.preventDefault();
                // update descktop list
                var valueSelected = jQuery(this).attr('href');
                console.log('click en = ' + valueSelected);
                jQuery('#select-tab li').removeClass('active');
                jQuery('#select-tab li a[href="' + valueSelected + '"]').parent('li').addClass('active');
            });

        }	// end exist #select-tab

    }	// end if id=videos


    // video functions
    function secondsToIso(secondsTotal) {
        /**
         * Convert a number of seconds to whole numbers of hours, minutes, seconds
         * @param {int}
         * @return {string}
         */
        var secondsIsoFormat = "PT";
        var hours = 0;
        var minutes = 0;
        var secons = 0;

        if (secondsTotal > 3600) {
            var hours = parseInt(secondsTotal / 3600);
            var remain = secondsTotal % 3600;
            var secondsIsoFormat = secondsIsoFormat + hours + "H";
        } else {
            var remain = secondsTotal;
        }

        if (remain > 60) {
            var minutes = parseInt(remain / 60);
            var remain = remain % 60;
            var secondsIsoFormat = secondsIsoFormat + minutes + "M" + remain + "S";
        } else {
            var secondsIsoFormat = secondsIsoFormat + remain + "S";
        }

        return secondsIsoFormat;
    }

    function getVimeoData(videoid, idContentVideo){
        var videoDuration = "";
        jQuery.ajax({
            url: "https://vimeo.com/api/oembed.json?url=" + videoid,
            dataType: "jsonp",
            success: function(data){
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="duration" content="' + secondsToIso(data.duration) + '" />');
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="description" content="' + data.title + '" />');
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="thumbnailUrl" content="' + data.thumbnail_url + '" />');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(textStatus, + ' | ' + errorThrown);
            }
        });
    }

    function getYoutubeDuration(videoid, idContentVideo){
        var videoDuration = "";
        jQuery.ajax({
            url: "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" + videoid + "&key=" + apikey,
            dataType: "jsonp",
            success: function(data){
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="duration" content="' + data.items[0].contentDetails.duration + '" />');
                //console.log("Video ID = " + videoid + " :: Duration = " + data.items[0].contentDetails.duration);
                //var videoDuration = data.items[0].contentDetails.duration;
                //console.log("Video ID = " + videoid + " :: Duration = " + videoDuration);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(textStatus, + ' | ' + errorThrown);
            }
        });
    }

    function getYoutubeData(videoid, idContentVideo){
        jQuery.ajax({
            url: "https://www.googleapis.com/youtube/v3/videos?id=" + videoid + "&key="+ apikey + "&part=snippet",
            dataType: "jsonp",
            success: function(data){
                //console.log("Video ID = " + videoid + " :: Title = " + data.items[0].snippet.title);
                //console.log("Video ID = " + videoid + " :: publishedAt = " + data.items[0].snippet.publishedAt);
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="description" content="' + data.items[0].snippet.title + '" />');
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="thumbnailUrl" content="' + data.items[0].snippet.thumbnails.high.url + '" />');
                jQuery(idContentVideo).parent().parent().append('<meta itemprop="uploadDate" content="' + data.items[0].snippet.publishedAt + '" />');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(textStatus, + ' | ' + errorThrown);
            }
        });
    }
    // end video functions


    function moveArrowDown()	{
        var time = 800;
        jQuery('.arrowSimpleWhite').css('backgroundPosition', '50% 100%');
        jQuery('.arrowSimpleWhite').fadeIn( time, function() {
            // Animation fadeIn 1 complete.
            jQuery('.arrowSimpleWhite').fadeOut( time, function() {
                // Animation fadeOut 1 complete.
                jQuery('.arrowSimpleWhite').css('backgroundPosition', '50% 100%');
                jQuery('.arrowSimpleWhite').fadeIn( time, function() {
                    // Animation fadeIn 2 complete.
                    jQuery('.arrowSimpleWhite').fadeOut( time, function() {
                        // Animation fadeOut 2 complete.
                        jQuery('.arrowSimpleWhite').css('backgroundPosition', '50% 100%');
                        jQuery('.arrowSimpleWhite').fadeIn( time, function() {
                            // Animation fadeIn 3 complete.
                            jQuery('.arrowSimpleWhite').fadeOut( time, function() {
                                // Animation fadeOut 3 complete.
                            });
                        });
                    });
                });
            });
        });
    } // end function moveArrowDown

    function removeProduct() {
        var element = jQuery(this).attr('href');
        jQuery('.wishlistTable tbody tr td a[href="' + element + '"]').click();
    }

    function updateCarouselCounter(idCarousel)	{
        var itemsCarousel = jQuery(idCarousel + ' .carousel-inner .item').size();
        var itemActive = jQuery(idCarousel + ' .carousel-inner .item.active').index() + 1;
        jQuery(idCarousel + ' .carousel-control .counterItems').text(itemActive + ' / ' + itemsCarousel);
    }

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

});	// end jQuery(document).ready(function()