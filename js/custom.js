
//
$(document).ready(function() {
			$('#fullpage').fullpage({
				'verticalCentered': false,
				'scrollingSpeed': 600,
				'autoScrolling': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right',
			});
		});

// wow
$(function()
{
    new WOW().init();
    $(".rotate").textrotator();
	$(".element").each(function () {
        var e = $(this);
        e.typed({
                strings: e.attr("data-elements").split(","),
                typeSpeed: 100,
                backDelay: 3e3
        })
	});
})