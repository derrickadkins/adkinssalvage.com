var menu_show = true;
var $logo;

$(document).ready(function(){	
	//set #active link
	//console.log(document.location.href);
	//console.log(document.location.pathname);
	//console.log($(location).attr('pathname'));
	//var pathname = document.location.href.match(/[^\/]+$/)[0];
	var pathname_arr = document.location.pathname.match(/[^\/]+$/);
	var pathname = pathname_arr != null ? pathname_arr[0] : "index.html";
	$("a[href='"+pathname+"']").prop("id", "active").prop("href", "#");

	$("#menu_open, #menu_close").click(function(event){
		event.stopPropagation();
		menu_toggle();
	});
	$("html").click(function() {
		if(!menu_show){
			menu_toggle();
		}
	});
	
	$logo = $("#header_logo_wrapper");
	
	$logo.data('size','big');
	$(window).on("scroll resize", function(){
		//clac logo size
		var w, h;
		if($(window).width() < 272){
			w = 0; //display:none
		}
		else if($(window).width() < 500){
			w = $(window).scrollTop() == 0 ? $(window).width()-50 : 222;
		}else{
			w = $(window).scrollTop() == 0 ? 400 : 222;
		}
		h = w*676/3000;
		
		//calc header height
		var nav_height = 32;
		var hh = $(window).width() < w + $("#nav_1").width() ? h + nav_height : h;
		hh += 4; //wrapping anchor tag add 4 pixels
		if(w == 0){
			$logo.hide();
			return;
		}
		
		$logo.show();
		if($(window).width() < w+100) $logo.css("margin-left",50);
		else $logo.css("margin","auto");
		
		//animate if needed
		if($(document).scrollTop() > 0 && $logo.data('size') == 'big'){
			$logo.data('size','small');
			$logo.stop().animate({width:w},300,padd_main(true,hh));
		}else if($(document).scrollTop() == 0 && $logo.data('size') == 'small'){
			$logo.data('size','big');
			$logo.stop().animate({width:w},300,padd_main(true,hh));
		}else{
			$logo.width(w);
			padd_main();
		}
		
		//dynamic css
		if(($(document).scrollTop() == 0 && $(window).width() < 1530) 
			|| ($(document).scrollTop() > 0 && $(window).width() < 1336))
			$("header .externals").hide();
		else $("header .externals").show();
		
		if(($(document).scrollTop() == 0 && $(window).width() < 1212) 
			|| ($(document).scrollTop() > 0 && $(window).width() < 1035))
			$("#nav_wrapper").css("flex", "100%");
		else $("#nav_wrapper").css("flex", "1");
	});
	
	//$(window).resize(function(){console.log("resize to " + $(window).width());});
	//$(window).scroll(function(){console.log("scroll to " + $(document).scrollTop());});
	
	$(window).trigger("scroll");
});

function padd_main(animate = false, height = $("header").height()){
	if(animate){
		$("main").animate({
			"padding-top":height
		},300);
	}else{
		$("main").css("padding-top", height);
	}
}

function menu_toggle(){
	var l = menu_show ? 0 : -200;
	$("#nav_2").animate({
		left: l
	}, 300);
	if(menu_show){
		$("#menu_open").hide();
		$("#menu_close").show();
	}else{
		$("#menu_close").hide();
		$("#menu_open").show();
	}
	menu_show = !menu_show;
}