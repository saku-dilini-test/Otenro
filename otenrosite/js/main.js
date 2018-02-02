jQuery( document ).ready(function( $ ) {
"use strict"
/*-----------------------------------------------------------------------------------*/
/* 	LOADER
/*-----------------------------------------------------------------------------------*/
$("#loader").delay(500).fadeOut("slow");
/*-----------------------------------------------------------------------------------*/
/* 	COUNTER JS
/*-----------------------------------------------------------------------------------*/
$('.counter .timer').countTo();
/*-----------------------------------------------------------------------------------*/
/*		STICKY NAVIGATION
/*-----------------------------------------------------------------------------------*/
$(".sticky").sticky({topSpacing:0});
/*-----------------------------------------------------------------------------------*/
/*  FULL SCREEN
/*-----------------------------------------------------------------------------------*/
$('.full-screen').superslides({});
/*-----------------------------------------------------------------------------------*/
/*    Parallax
/*-----------------------------------------------------------------------------------*/
jQuery.stellar({
   horizontalScrolling: false,
   scrollProperty: 'scroll',
   positionProperty: 'position',
});

/*-----------------------------------------------------------------------------------
    HOME STYLE 1
/*-----------------------------------------------------------------------------------*/
$('.home-slide').flexslider({
    animation: "fade",
	auto: true
});
/*-----------------------------------------------------------------------------------
    TESTNMONIALS STYLE 1
/*-----------------------------------------------------------------------------------*/
$('.testi-slide').flexslider({
    animation: "fade",
	controlsContainer: '.flex-container',
	controlNav: "thumbnails"
});
/*-----------------------------------------------------------------------------------
    TESTNMONIALS STYLE 2
/*-----------------------------------------------------------------------------------*/
$('.testi-slide-2').bxSlider({
  mode: 'fade',
  auto: true
});
/*-----------------------------------------------------------------------------------*/
/*	CUBE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
$('.ajax-work').cubeportfolio({
     filters: '#ajax-work-filter',
     loadMore: '#ajax-loadMore',
     loadMoreAction: 'click',
     layoutMode: 'grid',
     defaultFilter: '*',
     animationType: 'quicksand',
     gapHorizontal: 0,
     gapVertical: 0,
     gridAdjustment: '',
     caption: 'zoom',
     displayType: 'lazyLoading',
     displayTypeSpeed: 400,
     // singlePage popup
     singlePageDelegate: '.cbp-singlePage',
     singlePageDeeplinking: true,
     singlePageStickyNavigation: true,
     singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
     singlePageCallback: function(url, element) {
// to update singlePage content use the following method: this.updateSinglePage(yourContent)
var t = this;
 $.ajax({
     url: url,
     type: 'GET',
     dataType: 'html',
     timeout: 10000
 })
 .done(function(result) {
    t.updateSinglePage(result);
 })
  .fail(function() {
     t.updateSinglePage('AJAX Error! Please refresh the page!');
      });
   },
});

/*-----------------------------------------------------------------------------------*/
/* 	ANIMATION
/*-----------------------------------------------------------------------------------*/
var wow = new WOW({
    boxClass:     'animate',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       100,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
});
wow.init();
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
var $container = $('.port-wrap .items');
    $container.imagesLoaded(function () {
    $container.isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'masonry'
});	
});
$('.portfolio-filter li a').on('click', function () {
    $('.portfolio-filter li a').removeClass('active');
    $(this).addClass('active');
    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector
    });
return false;
});
});
/*-----------------------------------------------------------------------------------*/
/*    CONTACT FORM
/*-----------------------------------------------------------------------------------*/
function checkmail(input){
  var pattern1=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  	if(pattern1.test(input)){ return true; }else{ return false; }}     
    function proceed(){
    	var name = document.getElementById("name");
		var email = document.getElementById("email");
		//var company = document.getElementById("company");
//		var web = document.getElementById("website");
		var msg = document.getElementById("message");
		var errors = "";
	if(name.value == ""){ 
		name.className = 'error';
	  	  return false;}    
		  else if(email.value == ""){
		  email.className = 'error';
		  return false;}
		    else if(checkmail(email.value)==false){
		        alert('Please provide a valid email address.');
		        return false;}
//		    else if(company.value == ""){
//		        company.className = 'error';
//		        return false;}
//		   else if(web.value == ""){
//		        web.className = 'error';
//		        return false;}
		   else if(msg.value == ""){
		        msg.className = 'error';
		        return false;}
		   else 
		  {
$.ajax({
	type: "POST",
	url: "php/submit.php",
	data: $("#contact_form").serialize(),
	success: function(msg){
	//alert(msg);
    if(msg){
		$('#contact_form').fadeOut(1000);
        $('#contact_message').fadeIn(1000);
        	document.getElementById("contact_message");
         return true;
        }}});
}};

/*-----------------------------------------------------------------------------------*/
/*	Go TO TOP
/*-----------------------------------------------------------------------------------*/
var offset = 300,
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 1200,
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 700,
	//grab the "back to top" link
	$back_to_top = $('.cd-top');

//hide or show the "back to top" link
$(window).scroll(function(){
	( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
	if( $(this).scrollTop() > offset_opacity ) { 
		$back_to_top.addClass('cd-fade-out');
	}
});
//smooth scroll to top
$back_to_top.on('click', function(event){
	event.preventDefault();
	$('body,html').animate({
		scrollTop: 0 ,
	 	}, scroll_top_duration
);
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/*-----------------------------------------------------------------------------------
    Animated progress bars
/*-----------------------------------------------------------------------------------*/
$('.progress-bars').waypoint(function() {
  $('.progress').each(function(){
    $(this).find('.progress-bar').animate({
      width:$(this).attr('data-percent')
     },100);
});},
	{ 
	offset: '100%',
    triggerOnce: true 
});



/*-----------------------------------------------------------------------------------*/
/* 	SLIDER REVOLUTION
/*-----------------------------------------------------------------------------------*/
jQuery('.tp-banner').show().revolution({
	dottedOverlay:"none",
	delay:10000,
	startwidth:1170,
	startheight:700,
	navigationType:"bullet",
	navigationArrows:"solo",
	navigationStyle:"preview4",
	parallax:"mouse",
	parallaxBgFreeze:"on",
	parallaxLevels:[7,4,3,2,5,4,3,2,1,0],												
	keyboardNavigation:"on",						
	shadow:0,
	fullWidth:"on",
	fullScreen:"on",
	shuffle:"off",						
	autoHeight:"off",						
	forceFullWidth:"off",	
	fullScreenOffsetContainer:""	
});
/*-----------------------------------------------------------------------------------*/
/* 	SLIDER REVOLUTION
/*-----------------------------------------------------------------------------------*/
jQuery('.tp-banner-fix').show().revolution({
	dottedOverlay:"none",
	delay:10000,
	startwidth:1170,
	startheight:785,
	navigationType:"bullet",
	navigationArrows:"solo",
	navigationStyle:"preview4",
	parallax:"mouse",
	parallaxBgFreeze:"on",
	parallaxLevels:[7,4,3,2,5,4,3,2,1,0],												
	keyboardNavigation:"on",						
	fullWidth:"off",
	fullScreen:"off"
});


/*-----------------------------------------------------------------------------------*/
/* 	SINGLE SLIDE
/*-----------------------------------------------------------------------------------*/
$(".single-slides").owlCarousel({ 
    items : 1,
	autoplay:true,
	loop: true,
	autoplayHoverPause:true,
	singleItem	: true,
	navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	lazyLoad:true,
	nav: true,
	animateOut: 'fadeOut'	
});

$('.testi-simple-slide').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
	loop: true,
	navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        400:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

/*-----------------------------------------------------------------------------------*/
/* 	SCROLL LINKS 
/*-----------------------------------------------------------------------------------*/
// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(this).closest('.collapse').collapse('toggle');
});
