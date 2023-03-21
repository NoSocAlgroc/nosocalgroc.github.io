$("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
	overflow: "visible"
}), $(window).on("scroll", (function () {
	$(window).scrollTop() >= 50 ? $(".sticky").addClass("stickyadd") : $(".sticky").removeClass("stickyadd")
})), $(".navbar-nav a, .scroll_down a").on("click", (function (e) {
	var t = $(this);
	$("html, body").stop().animate({
		scrollTop: $(t.attr("href")).offset().top - 0
	}, 1500, "easeInOutExpo"), e.preventDefault()
})), $("#navbarCollapse").scrollspy({
	offset: 20
});
var a = 0;
/*
$(window).on("scroll", (function () {
	var e = $("#counter").offset().top - window.innerHeight;
	0 == a && $(window).scrollTop() > e && ($(".lan_fun_value").each((function () {
		var e = $(this),
			t = e.attr("data-count");
		$({
			countNum: e.text()
		}).animate({
			countNum: t
		}, {
			duration: 2e3,
			easing: "swing",
			step: function () {
				e.text(Math.floor(this.countNum))
			},
			complete: function () {
				e.text(this.countNum)
			}
		})
	})), a = 1)
})),
*/ $(window).on("load", (function () {
	var e = $(".work-filter"),
		t = $("#menu-filter");
	e.isotope({
		filter: "*",
		layoutMode: "masonry",
		animationOptions: {
			duration: 750,
			easing: "linear"
		}
	}), t.find("a").on("click", (function () {
		var o = $(this).attr("data-filter");
		return t.find("a").removeClass("active"), $(this).addClass("active"), e.isotope({
			filter: o,
			animationOptions: {
				animationDuration: 750,
				easing: "linear",
				queue: !1
			}
		}), !1
	}))
})), $(".img-zoom").magnificPopup({
	type: "image",
	closeOnContentClick: !0,
	mainClass: "mfp-fade",
	gallery: {
		enabled: !0,
		navigateByImgClick: !0,
		preload: [0, 1]
	}
}), $("#owl-demo").owlCarousel({
	autoPlay: 7e3,
	stopOnHover: !0,
	navigation: !1,
	paginationSpeed: 1e3,
	goToFirstSpeed: 2e3,
	singleItem: !0,
	autoHeight: !0
}), $(".blog_play").magnificPopup({
	disableOn: 700,
	type: "iframe",
	mainClass: "mfp-fade",
	removalDelay: 160,
	preloader: !1,
	fixedContentPos: !1
}), $(window).on("scroll", (function () {
	$(this).scrollTop() > 100 ? $(".back_top").fadeIn() : $(".back_top").fadeOut()
})), $(".back_top").click((function () {
	return $("html, body").animate({
		scrollTop: 0
	}, 1e3), !1
})), $(".element").each((function () {
	var e = $(this);
	e.typed({
		strings: e.attr("data-elements").split(","),
		typeSpeed: 100,
		backDelay: 3e3
	})
})), $("body").bind("cut copy paste", (function (e) {
	e.preventDefault()
})), window.onload = function () {
	function e(e) {
		return e.stopPropagation ? e.stopPropagation() : window.event && (window.event.cancelBubble = !0), e.preventDefault(), !1
	}
document.addEventListener("keydown", (function (t) {
		t.ctrlKey && t.shiftKey && 73 == t.keyCode && e(t), t.ctrlKey && t.shiftKey && 74 == t.keyCode && e(t), 83 == t.keyCode && (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) && e(t), t.ctrlKey && 85 == t.keyCode && e(t), 123 == event.keyCode && e(t)
	}), !1)
};


//Skill carousel
$(window).on("load",function(){
	var itemsPerPage=0;

	var data=$("#languagesCarouselContainer .data");
	data.detach();

	const languages=data.children();
	const numLanguages=languages.length;

	//templates to copy
	const templates=$("#languagesCarouselContainer .templates")
	const pageTemplate=templates.children(".carousel-item");
	const containerTemplate=templates.children(".logo-col");
	const tagTemplate=templates.children(".skill-tag");
	const indicatorTemplate=templates.children("li");



	//Copy items from the data with the appropiate dimensions
	const updateItemsFunc=function()
	{
		//Get carousel div and empty its contents
		const carousel=$("#languagesCarousel");
		const inner=carousel.children(".carousel-inner");
		const indicators=carousel.children(".carousel-indicators");



		//Calculate items per page and see if a change is needed

		const width=inner[0].clientWidth;

		const itemWidth=330;
		var items=Math.floor(width/itemWidth);
		
		if(items<=0)items=1;

		//No changes
		if(items==itemsPerPage)return;

		//Yes changes, empty and rebuild
		itemsPerPage=items;

		inner.empty();
		indicators.empty();

		//create containers to fit width
		var containerIdx=0;
		const numPages=Math.ceil(numLanguages/itemsPerPage);

		//for each page
		for(var pageIdx=0;pageIdx<numPages;pageIdx++)
		{
			//Create page
			const page=pageTemplate.clone();

			//For each container to be placed in this page
			for(var pageContainerIdx=0;pageContainerIdx<itemsPerPage && containerIdx<numLanguages;pageContainerIdx++,containerIdx++)
			{
				const language=$(languages[containerIdx]);
				//Create container
				const col=containerTemplate.clone();
				const container=col.children();
				container[0].style.cssText=language[0].style.cssText;
				container.children(".lang-name").text(language.children(".lang-name").text());

				//Insert tags
				const tagContainer=container.children(".skill-tag-container");
				const tags=language.children(".tags").children();
				for(var tagIdx=0;tagIdx<tags.length;tagIdx++)
				{
					const tag=tagTemplate.clone();					

					const tooltipHTML=tags[tagIdx].querySelector(".tooltipHTML");

					tag.attr("data-toggle","tooltip");
					tag.attr("data-html","true");
					tag.attr("title",tooltipHTML.innerHTML)
					tag.text(tags[tagIdx].querySelector(".tagHTML").textContent);

					//add tag
					tagContainer.append(tag);
				}

				//Set logo source
				const img=container.children("img");
				const logoFile=language.children(".logo-file").text();
				img.attr("src","images/logos/"+logoFile);

				//Set percentage
				const percent=language.children(".percentage").text();
				container.children(".skill-percentage").text(percent+"%");
				container.children(".progress").children(".progress-bar").css("width",percent+"%");

				//Add column to page
				page.children().append(col);

			}
			//Add page to carousel
			inner.append(page);
			//Add page indicator
			const indicator=indicatorTemplate.clone();
			indicator.attr("data-slide-to",pageIdx.toString());
			indicators.append(indicator);
		}
		//set first page active
		indicators.children().first().addClass("active");
		inner.children().first().addClass("active");
	};

	updateItemsFunc();

	$(window).on("resize",updateItemsFunc);
	
});

//Skills panel
$(window).on("load", function () {
	var itemsPerRow = 0;
	

	const rowsPerPage = 4;

	const data = $("#skillsPanelContainer .data");
	data.detach();

	const allSkills = data.children();
	var skills=null;

	const updateFilterSkills=function(filterWords)
	{
		const filter=function()
		{
			const name=$(this).find(".skill-name")[0].innerText.trim();
			const keywords=[name.toLowerCase()];
			return filterWords.every((fl)=>keywords.some((kw)=> kw.includes(fl)));
		};
		skills=allSkills.filter(filter);
	};
	updateFilterSkills([]);
	
	//templates to copy
	const templates = $("#skillsPanelContainer .templates");
	const pageTemplate = templates.children(".carousel-item");
	const rowTemplate = templates.children(".skillsRow");
	const colTemplate = templates.children(".skillCol");

	const indicatorTemplate = templates.children("li");



	//Copy items from the data with the appropiate dimensions
	const updateItemsFunc = function () {
		//Get carousel div and empty its contents
		const carousel = $("#skillsCarousel");
		const inner = carousel.children(".carousel-inner");
		const indicators = carousel.children(".carousel-indicators");

		inner.empty();
		indicators.empty();

		//create containers to fit width
		var containerIdx = 0;
		const numRows = Math.ceil(skills.length / itemsPerRow);
		const numPages = Math.ceil(numRows / rowsPerPage);

		//for each page
		for (var pageIdx = 0; pageIdx < numPages; pageIdx++) {
			//Create page
			const page = pageTemplate.clone();

			//for each row to be placed in this page
			for (var rowIdx = 0; rowIdx < rowsPerPage; rowIdx++) {
				const row=rowTemplate.clone();

				//For each container to be placed in this row
				for (var rowContainerIdx = 0; rowContainerIdx < itemsPerRow && containerIdx < skills.length; rowContainerIdx++, containerIdx++) {
					const skill = $(skills[containerIdx]);
					//Create container
					const col = colTemplate.clone();
					const container = col.children();
					container[0].style.cssText = skill[0].style.cssText;
					container.children(".skill-name").text(skill.children(".skill-name").text());

					//Set logo source
					const img = container.children("img");
					const logoFile = skill.children(".logo-file").text();
					img.attr("src", "images/logos/" + logoFile);

					//Set percentage
					const percent = skill.children(".percentage").text();
					container.children(".skill-percentage").text(percent + "%");
					container.children(".progress").children(".progress-bar").css("width", percent + "%");

					//Set more tooltip
					const skillHTML = skill.children(".skillHTML").html();
					if(skillHTML)
					{
						container.children(".skill-more").attr({
							"data-toggle":"tooltip",
							"data-html":"true",
							"title":skillHTML
						});
					}

					//Add column to row
					row.append(col);

				}

				//Add row to page
				page.children().append(row);
			}
			//Add page to carousel
			inner.append(page);
			//Add page indicator
			const indicator = indicatorTemplate.clone();
			indicator.attr("data-slide-to", pageIdx.toString());
			indicators.append(indicator);
		}
		//set first page active
		indicators.children().first().addClass("active");
		inner.children().first().addClass("active");

		//Disable carousel buttons if they are unnecessary
		carousel.children(".carousel-control").prop('hidden',numPages<=1)
	};

	

	const onResize=function()
	{
		//Update only if resize triggers change in itemsPerRow
		//Get carousel div
		const carousel = $("#skillsCarousel");
		const inner = carousel.children(".carousel-inner");

		//Calculate items per page and see if a change is needed

		const width = inner[0].clientWidth;

		const itemWidth = 200;
		var items = Math.floor(width / itemWidth);

		if (items <= 0) items = 1;

		//No changes
		if (items == itemsPerRow) return;

		//Yes changes, empty and rebuild
		itemsPerRow = items;
		updateItemsFunc();
	};

	const skillsFilter=$("#skillsFilter");
	const updateFilter=function()
	{
		string=skillsFilter.val();
		if(string==null)return [];
		filter=string.toLowerCase().split(" ");
		updateFilterSkills(filter);
		updateItemsFunc();
	};

	//initial build
	onResize();
	$(window).on("resize", onResize);
	skillsFilter.on("input",updateFilter)

});


//See more buttons for languages carousel

$(window).on("load",function(){
	//buttons
	var buttons=$("#languagesCarousel .skill-more");
	buttons.on("click",function(ev)
	{
		var container = this.parentElement;
		var parent=container.parentElement;
		var rect=container.getBoundingClientRect();

		var newContainer=container.cloneNode(true);

		newContainer.style.width=rect.width+"px";
		newContainer.style.height=rect.height+"px";

		newContainer.style.left=rect.left+"px";
		newContainer.style.top=rect.top+"px";
		

		newContainer.classList.add("expanding");
		
		document.body.appendChild(newContainer);

	});
	//see more buttons

});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
  })