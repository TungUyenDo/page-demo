;(function($, window, document, undefined) {

	"use strict"; 

	/* ================================
	===  VARIABLES                 ====
	=================================== */
	var $win = $(window),
		$doc = $(document),
		$body = $('body'),
		$bodyHtml = $('body,html');
	var winW, winH, winTop;

	$doc.on('ready', function(){


		/* ================================
		===  SLIDING NAVIGATION        ====
		=================================== */
	    var navTrigger = $('.nav-trigger'),
	    	langTrigger = $('.lang-trigger'),
	        overlay = $('.consta-overlay'),
	        overlayLang = $('.overlay-lang'),
	        navigationLiNot = $('#navigation li:not(.menu-item-has-children)'),
	        menuItemHasChildren = $('.menu-item-has-children');
	        

	        function toggleNavigation( event ) {
	            event.preventDefault();
	            $body.toggleClass('nav-open');
	        }

	        function overlayFunction() {
	            $body.toggleClass('nav-open');
	        }

	        navTrigger.on('click',toggleNavigation);
	        overlay.on('click',overlayFunction);
	        

	        navigationLiNot.each(function(){  
	            $(this).on('click',function(){
	                $body.toggleClass('nav-open');
	            });
	        });

	    //open (or close) submenu items in the mobile menu. Close all the other open submenu items.
		menuItemHasChildren.children('a').on('click', function(event){
			event.preventDefault();
			$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.menu-item-has-children').siblings('.menu-item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
		});

		function toggleLang() {
			$body.toggleClass('lang-open');
		}

		function overlayLangFunction() {
            $body.toggleClass('lang-open');
        }

		langTrigger.on('click',toggleLang);
		overlayLang.on('click',overlayLangFunction);


		/* ================================
		===  PARALLAXIFY               ====
		=================================== */

		$.parallaxify({
			positionProperty: 'transform',
			responsive: true,
			motionType: 'natural',
			mouseMotionType: 'performance',
			motionAngleX: 70,
			motionAngleY: 70,
			alphaFilter: 0.5,
			adjustBasePosition: true,
			alphaPosition: 0.025
		});

		/* ================================
		=== HEADER ANIMATION           ====
		=================================== */
		var iScrollPos = 0,
			scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 0,
			scrollOffset = 500,
			mainHeader = $('header'),
			headerHeight = mainHeader.height();

		function scrollEffect() {

			var iCurScrollPos = $(this).scrollTop();
			
			if (iCurScrollPos > iScrollPos && iCurScrollPos > 120) {

		        mainHeader.addClass('scrolling');
		      
		    } else if ( iCurScrollPos < 120) {

		       mainHeader.removeClass('scrolling');
		    }

		    iScrollPos = iCurScrollPos;	
		}

		function autoHideHeader() {
			var currentTop = $(window).scrollTop();

			checkDirection(currentTop);

		   	previousTop = currentTop;
			scrolling = false;
		}

		function checkDirection(currentTop) {
		    if (previousTop - currentTop > scrollDelta) {
		    	//if scrolling up...
		    	mainHeader.removeClass('is-hidden');
		    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		    	//if scrolling down...
		    	mainHeader.addClass('is-hidden');
		    }
		}
		
		$win.on('scroll',scrollEffect);

		$win.on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});

		$win.on('resize', function(){
			headerHeight = mainHeader.height();
		});

		/* ================================
		===  BACK TO TOP ANIMATION     ====
		=================================== */
		var offset = 700,
			offsetOpacity = 1200,
			scrollTopDuration = 700,
			backToTop = $('.back-to-top');

		//hide or show the "back to top" link
		$win.scroll(function(){
			( $(this).scrollTop() > offset ) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible fade-out');
			if( $(this).scrollTop() > offsetOpacity ) { 
				backToTop.addClass('fade-out');
			}
		});

		//smooth scroll to top
		backToTop.on('click', function(event){
			event.preventDefault();
			$bodyHtml.animate({
				scrollTop: 0 ,
			 	}, scrollTopDuration
			);
		});

		/* ================================
		===  Animation on Scroll       ====
		=================================== */
		AOS.init({
	    	duration: 1000,
	    	easing: 'ease-in-out',
	    	offset: 0
	    });



		/* ================================
		===  Browser and Device Fixing ====
		=================================== */
		Modernizr.addTest('backgroundclip',function() {

		    var div = document.createElement('div');

		    if ('backgroundClip' in div.style)
		      return true;

		    'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g,function(val) { 
		      if (val+'BackgroundClip' in div.style) return true;
		    });

		});

		var placeholderSupport = ("placeholder" in document.createElement("input"));
			if(!placeholderSupport){
				
			  //This browser does not support the placeholder attribute
			  //use javascript instead
			  $('[placeholder]').focus(function() {
			    var input = $(this);
			    if (input.val() === input.attr('placeholder')) {
			      input.val('');
			      input.removeClass('placeholder');
			    }
			  }).blur(function() {
			    var input = $(this);
			    if (input.val() === '' || input.val() === input.attr('placeholder')) {
			      input.addClass('placeholder');
			      input.val(input.attr('placeholder'));
			    }
			  }).blur().parents('form').submit(function() {
			    $(this).find('[placeholder]').each(function() {
			      var input = $(this);
			      if (input.val() === input.attr('placeholder')) {
			        input.val('');
			      }
			    })
			});
		}

		if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) || navigator.userAgent.match(/iPhone;.*CPU.*OS 7_\d/i) ) {
		    $('.section-slider').height(window.innerHeight);
		    window.scrollTo(0, 0);
		}


		/* ================================
		===  SCROLLSPY INIT            ====
		=================================== */
		var scrollSpy,
			kcSpy;

		scrollSpy = new ScrollSpy({
			linksContainerSelector: '#onepage-menu',
			sectionSelector: '.section'
		});

		kcSpy = new ScrollSpy({
			linksContainerSelector: '#kc-menu',
			sectionSelector: '.kc_row'
		});
	
		scrollSpy.init();
		kcSpy.init();
		
		
		/* ================================
		===  SPYBUTTONS                ====
		=================================== */
		var spyButtons = $('.spy-buttons a, .quote-btn a'),
			scrollDuration = 700;

		spyButtons.each(function(){
			var $this = $(this);

			$this.on('click', function(event) {
				if(!$this.attr('href').includes('http')) {
					event.preventDefault();
				}
				var currentLink = $this.attr('href');
				var currentSection = $body.find('section' + currentLink);
				var newPos = currentSection.offset().top;
				
				$bodyHtml.animate({
					scrollTop: newPos,
				 	}, scrollDuration
				);

			});
		});

		/* ================================
		===  OWL CAROUSELS             ====
		=================================== */

		var owlTeam = $('#owl-team');
		  
	   	owlTeam.owlCarousel({
		    loop: true,
		    nav: true,
		    navText: false,
		    responsive:{
		        0:{
		            items:1
		        },
		        
		        600:{
		            items:2
		        },

		        767:{
		            items:3
		        },

		        1000:{
		            items:4
		        }
		    }
		});

	  

	   	/* ================================
		===  Fullscreen Modal Boxes    ====
		=================================== */

		var modal = $('.modal'),
			modalBox = $(".modal-fullscreen"),
			modals = $("div[id^='serviceModal'],div[id^='projectModal']"),
			modalBackdrop = $(".modal-backdrop"),
			modalBackdropIn = $(".modal-backdrop.in"),
			modalVisible = $('.modal:visible');

		modalBox.on('show.bs.modal', function () {
			setTimeout( function() {
				modalBackdrop.addClass("modal-backdrop-fullscreen");
			},0);
		});

		modalBox.on('shown.bs.modal', function () {
			 $body.addClass('modal-open');
		});

		modalBox.on('hidden.bs.modal', function () {
			modalBackdrop.addClass("modal-backdrop-fullscreen");
		});

		modals.each(function(){
			var currentModal = $(this);
			//click next
			currentModal.find('.btn-next').on('click', function(){
				currentModal.modal('hide');
			    var closestModal = currentModal.closest(modals).nextAll(modals).first();
			    closestModal.modal('show');
			});
			//click prev
			currentModal.find('.btn-prev').on('click', function(){
				currentModal.modal('hide');
			    var closestModal = currentModal.closest(modals).prevAll(modals).first();
			    closestModal.modal('show');
			    if(closestModal.hasClass('nomore-modals')) {
			    	var currentBackdrop = $('.modal-backdrop');
			    	currentBackdrop.remove();
			    }
			});
		});

		// This just makes all bootstrap native .modals live together
		modal.on("hidden.bs.modal", function (e) {
		    if(modalVisible.length)
		    {
		        modalBackdrop.first().css('z-index', parseInt(modalVisible.last().css('z-index')) - 10);
		        $body.addClass('modal-open');
		    }
		}).on("show.bs.modal", function (e) {
		    if(modalVisible.length)
		    {
		        modalBackdropIn.first().css('z-index', parseInt(modalVisible.last().css('z-index')) + 10);
		        $(this).css('z-index', parseInt(modalBackdropIn.first().css('z-index')) + 10);
		    }
		});

		/* ================================
		===  RETINA READY              ====
		=================================== */
		retinajs();

	   
	});



	/* ================================
	===  SCROLLSPY CORE FUNCTIONS  ====
	=================================== */
	var ScrollSpy = function(options) {
		var _spy = this;
		
		_spy.linksContainerSelector = options.linksContainerSelector;
		_spy.sectionSelector = options.sectionSelector;
		
		_spy.$linksContainer = $(_spy.linksContainerSelector);
		_spy.$links = _spy.$linksContainer.find('li:not(.menu-item-has-children) a');
		_spy.$sections = $(_spy.sectionSelector);
		_spy.headerOffset = options.headerOffset;
		
		_spy.current;
		_spy.data = {};
	};
	
	ScrollSpy.prototype.getPositions = function() {
		var _spy = this;
		var data = _spy.data;

		_spy.$links.each(function() {
			var $link = $(this);
			
			if(!$link.attr('href').includes('http')) {
				var $section = $($link.attr('href'));
				if($section.length) {
					data[$section.attr('id')] = $section.offset().top;
				}
			}
		});
	};
	
	ScrollSpy.prototype.refreshPositions = function() {
		var _spy = this;
		var data = _spy.data;
		
		_spy.$links.each(function() {
			var $link = $(this);
			if(!$link.attr('href').includes('http')) {
				var $section = $($link.attr('href'));
				if($section.length) {
					data[$section.attr('id')] = $section.offset().top;
				}
			}	
		});
	};
	
	ScrollSpy.prototype.getCurrentSection = function() {
		var _spy = this;
		var data = _spy.data;
		var scrollTop = $(window).scrollTop();

		for( var section in data ) {
			var $currentSection = $('#' + section);
			var $nextSection = $currentSection.next('.section');

			if( scrollTop >= $currentSection.offset().top - winH / 5 && $nextSection.length > 0 && $nextSection.offset().top >= scrollTop || scrollTop >= $currentSection.offset().top - winH / 5 && $nextSection.length === 0 ) {
				_spy.current = '#' + section;
			}
		}
		
		_spy.setCurrent();
	};
	
	ScrollSpy.prototype.setCurrent = function() {
		var _spy = this;

		_spy.$links.parents('ul:eq(0)').find('.active').removeClass('active');

		if( _spy.$linksContainer.find('a[href="' + _spy.current + '"]').length ) {
			_spy.$linksContainer.find('a[href="' + _spy.current + '"]').addClass('active');
		}
	};
	
	ScrollSpy.prototype.scrollToCurrentSection = function() {
		var _spy = this;
		
		var $section = $( _spy.current );
		var newTop = $section.offset().top;

		if( winW < 768 ) {
			newTop += $('.header').height();
		}
		
		$('html, body').animate({
			scrollTop: newTop
		}, {
			duration: 700,
			queue: false
		});
	};
	
	ScrollSpy.prototype.bindEvents = function() {
		var _spy = this;
		
		_spy.$links
			.on('click.scrollSpy', function(e) {
				
				_spy.current = $(this).attr('href');

				if(!_spy.current.includes('http')) {
					e.preventDefault();
					_spy.scrollToCurrentSection();
				} 
			
				if( $('.navbar-collapse').hasClass('in') ) {
					$('.navbar-toggle').trigger('click');
				}
			});
		
		$win.on('scroll.scrollSpy', function() {
			_spy.getCurrentSection();
		});
	};
	
	ScrollSpy.prototype.init = function() {
		var _spy = this;
		
		_spy.getPositions();
		_spy.getCurrentSection();
		_spy.setCurrent();
		_spy.bindEvents();
	};


	var detailSlider = $('#detail-slider1 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider2 .carousel-inner .item').first();
	detailSlider.addClass('active')

	var detailSlider = $('#detail-slider3 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider4 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider5 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider6 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider7 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider8 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider9 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider10 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider11 .carousel-inner .item').first();
	detailSlider.addClass('active');

	var detailSlider = $('#detail-slider12 .carousel-inner .item').first();
	detailSlider.addClass('active');

	/* ================================
			   ===  GOOGLE MAP AND STYLE      ====
			   =================================== */
	var mapStyle = [
		{
			featureType: 'all',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#ededed'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#b7b7b7'
				}
			]
		},
		{
			featureType: 'road',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#FFFFFF'
				}
			]
		},
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#cfcfcf'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#333333'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [
				{
					visibility: 'off'
				}
			]
		},
		{
			featureType: 'poi',
			elementType: 'all',
			stylers: [
				{
					visibility: 'off'
				}
			]
		},
		{
			featureType: 'transit',
			elementType: 'all',
			stylers: [
				{
					visibility: 'off'
				}
			]
		}
	];

	function initMaps() {
		var geocoder = new google.maps.Geocoder();

		var $maps = $('.map');

		if ($maps.length) {
			$maps.each(function () {
				var map = this;
				var $map = $(this);
				var address = $map.data('address');
				var latLng, gMap, pin;

				geocoder.geocode({ 'address': address }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
					} else {
						console.log("Geocoding unsuccessful. Reason: " + status);

						latLng = new google.maps.LatLng(48.104786, 16.049149);
					}

					var styledMap = new google.maps.StyledMapType(mapStyle, { name: 'Styled Map' });

					gMap = new google.maps.Map(map, {
						center: latLng,
						zoom: 16,
						disableDefaultUI: true,
						scrollwheel: false
					});

					gMap.mapTypes.set('map_style', styledMap);
					gMap.setMapTypeId('map_style');

					pin = new google.maps.Marker({
						position: latLng,
						map: gMap,
						icon: 'http://demo.iamarif.com/consta-wp/wp-content/uploads/2017/01/map-pin.png'
					});
				});
			});
		}
	}

	// window.initMaps = initMaps;

	var owl = $("#owl-consta");
	var animStyle = 'slideInDown';

	owl.owlCarousel({
		nav: false,
		paginationSpeed: 2500,
		autoplay: true,
		dots: true,
		navText: [],
		smartSpeed: 500,
		loop: true,
		items: 1,
		itemsDesktop: false,
		itemsDesktopSmall: false,
		itemsTablet: false,
		itemsMobile: false,
		onInitialize: doAnimation(animStyle)
	});

	owl.on('changed.owl.carousel', function (event) {
		doAnimation(animStyle);
	});

	function doAnimation(animName) {
		var animEnd = 'webkitAnimationEnd animationend';
		var target1 = $('.item .caption-text h1'),
			target2 = $('.item .caption-text h3'),
			target3 = $('.item .caption-text p');

		target1.addClass('animated ' + animName + '').one(animEnd, function () {
			target1.removeClass('animated ' + animName + '')
		});

		target2.addClass('animated ' + animName + '').one(animEnd, function () {
			target2.removeClass('animated ' + animName + '')
		});

		target3.addClass('animated ' + animName + '').one(animEnd, function () {
			target3.removeClass('animated ' + animName + '')
		});
	}


})(jQuery, window, document);