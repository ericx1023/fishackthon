/*
	Transitive by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function ($) {

	function base64ToArrayBuffer (base64) {
		base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
		var binaryString = atob(base64);
		var len = binaryString.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	}
	var input = document.getElementById('files');
	var files = input.files;
	

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
			reader.onload = (function (theFile) {

				return function (e) {
	
					var span = document.createElement('span');
					span.innerHTML = ['<img class="thumb" width="100%" src="', e.target.result,
						'" title="', escape(theFile.name), '"/>'].join('');
					$('#list').html(span);

				};
			})(f);
            reader.onloadend = function (e) {
                // get EXIF data
                var exif = EXIF.readFromBinaryFile(base64ToArrayBuffer( e.target.result));

                var lat = exif.GPSLatitude;
                var lon = exif.GPSLongitude;

                //Convert coordinates to WGS84 decimal
                var latRef = exif.GPSLatitudeRef || "N";  
                var lonRef = exif.GPSLongitudeRef || "W";  
                lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
                lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1); 
                
               //Send the coordinates to your map
                Map.AddMarker(lat,lon);
            } 

			// Read in the image file as a data URL.
			reader.readAsDataURL(f);


			$('html, body').animate({ scrollTop: $("#footer").offset().top }, 1000);

		}


		var form = $('form')[0];
		var formdata = new FormData(form);

		$.ajax({
			url: "upload",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (resp) {
				// .. do something
				console.log(resp);
				if (resp.filename) {
					alert('上傳成功');

				
				}
			},
			error: function (jqXHR, textStatus, errorMessage) {
				console.log(errorMessage); // Optional
			}
		});


	}

	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	


	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
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
			&& $header.hasClass('alt')) {

			$window.on('resize', function () { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom: $header.outerHeight(),
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt'); },
				leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}

		// Banner.

		if ($banner.length > 0) {

			// IE fix.
			if (skel.vars.IEVersion < 12) {

				$window.on('resize', function () {

					var wh = $window.height() * 0.60,
						bh = $banner.height();

					$banner.css('height', 'auto');

					window.setTimeout(function () {

						if (bh < wh)
							$banner.css('height', wh + 'px');

					}, 0);

				});

				$window.on('load', function () {
					$window.triggerHandler('resize');
				});

			}

			// Video check.
			var video = $banner.data('video');

			if (video)
				$window.on('load.banner', function () {

					// Disable banner load event (so it doesn't fire again).
					$window.off('load.banner');

					// Append video if supported.
					if (!skel.vars.mobile
						&& !skel.breakpoint('large').active
						&& skel.vars.IEVersion > 9)
						$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

				});

			// More button.
			$banner.find('.more')
				.addClass('scrolly');

		}

		// Scrolly.
		if ($(".scrolly").length) {

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

	$('.js-recognition').on('click', function (e) {
		var $image = $('#list img');
		var title = $image.attr('title');
		if (!title) {
			alert('請先上傳圖片');
		}
		else {
			$.ajax({
				url: 'recognition?name=' + title,
				type: "get",
			})
			.done(function(res){
				console.log(res)
				updateResult();
			})
		}
	})

	function updateResult(res) {
		$('.js-fishname').html(res.fishname);
		$('.js-allow').html(res.allow);
		
	}
})(jQuery);