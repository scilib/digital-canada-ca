Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

$(document).ready(function() {
	$('#js-mainNavButton').on('click touchup', function(){
		$('#js-mobileNav').addClass('active');
		
	});

	$('#js-mobileNav--button').on('click touchup', function(){
		$('#js-mobileNav').addClass('hiding');
		setTimeout(function(){
			$('#js-mobileNav').removeClass('active hiding').removeAttr('class');
		}, 305)
	});

	// Sticky threshold
	var threshold = $('main').position().top;

	var topBar = $('.cds-menu');

	$(window).scroll(function() {

		var scroll = $(window).scrollTop();

		if(scroll >= threshold) {
			if(!topBar.hasClass('sticky')) {
				topBar.addClass('sticky');
			}
		}

		else {
			if(topBar.hasClass('sticky')) {
				topBar.removeClass('sticky');
			}
		}
	});

	// Homepage video header/bg controls
	var videobg = $('video#js-video-bg').get(0);

	if($('video#js-video-bg').length) {
        // listeners to set play/pause button state based on video state
        videobg.onpause = function () {
        	$('#js-play-pause #js-playing').hide();
        	$('#js-play-pause #js-paused').show();
        };

        videobg.onplay = function () {
            $('#js-play-pause #js-playing').show();
            $('#js-play-pause #js-paused').hide();
        };

        // start playing on load
        videobg.autoplay = true;
    }

    // display video controls
    $('.page-banner--video-controls').removeClass('hidden');

	// listener for video controls
    $('#js-play-pause').on('click touchup', function(e){
		e.preventDefault();

		videobg.playing ? videobg.pause() : videobg.play();
	});

	// Add target=_blank to external links
	// Thanks to http://css-tricks.com/snippets/jquery/open-external-links-in-new-window/
	$("#wb-cont a[href^='http://']").attr("target","_blank");
	$("#wb-cont a[href^='https://']").attr("target","_blank");


	//Application form controls
	$('#contactForm').submit(function(event) {
		event.preventDefault();

       $('#submitButton').attr("disabled", true);
       $('#buttonSpinner').toggleClass('active');

        var data = {
            name: $('#name').val(),
            email: $('#email').val(),
            stream: $('#streams').val(),
            body: $('#body').val(),
            work_link: $('#work_link').val(),
            work_link_2: $('#work_link_2').val()
        }

        var pageLanguage = $('html').attr('lang');
       
        $.ajax({
            type: 'POST',
            url: 'https://109c1buw3d.execute-api.us-east-1.amazonaws.com/prod/SendRecruitmentEmail',
            dataType: 'text',
            data: JSON.stringify(data),
            complete: function(r) {
                console.log(r.responseText);
            },
            success: function() {
                if (pageLanguage == 'en') {
        			window.location.href = "/success/";
        		}
        		else {
        			window.location.href = "/reussi/";
        		}
            },
            error: function(xhr, textStatus, errorThrown) {
                if (pageLanguage == 'en') {
        			window.location.href = "/error/";
        		}
        		else {
        			window.location.href = "/erreur/";
        		}
            }
        });

	});

}); 