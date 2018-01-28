/*
	Transitive by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {
	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object
	
	   // Loop through the FileList and render image files as thumbnails.
	   for (var i = 0, f; f = files[i]; i++) {
	
		 // Only process image files.
		 if (!f.type.match('image.*')) {
		   continue;
		 }
	
		 var reader = new FileReader();
	
		 // Closure to capture the file information.
		 reader.onload = (function(theFile) {	
		   return function(e) {
			  // Render thumbnail.
			  var span = document.createElement('span');
			  span.innerHTML = ['<img class="thumb" width="100%" src="', e.target.result,
							'" title="', escape(theFile.name), '"/>'].join('');
			  document.getElementById('list').insertBefore(span, null);

		};
		  })(f);
	
		  // Read in the image file as a data URL.
		  reader.readAsDataURL(f);
		  
		  var form = $('form')[0];
		  var formdata = new FormData(form);
		  $.ajax({
			  url: "upload",
			  type: "POST",
			  data: formdata,
			  processData: false,
			  contentType: false,
			  success: function(resp) {
				  // .. do something
				  console.log(resp);
			  },
			  error: function(jqXHR, textStatus, errorMessage) {
				  console.log(errorMessage); // Optional
			  }
		   });

		//   fd.append("fileToUpload", blobFile);
	  
		}
	  }
	
	  document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

			}

		// Banner.

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			if ( $( ".scrolly" ).length ) {

				var $height = $('#header').height() * 0.95;

				$('.scrolly').scrolly({
					offset: $height
				});
			}

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);