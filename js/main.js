//Cache reference to window and animation items
var $animation_elements;
var $window = $(window);
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
	
	$animation_elements = $(".img_wrapper");
	$logo = $("#header_logo_wrapper");
	$logo.data('size','big');
	
	//calc nav width
	var nw = 0;
	$(".top_lvl").each(function(i, a){
		//console.log($(this).outerWidth(true));
		nw += $(this).outerWidth(true);
	});
	nw += 30;//why?
	
	//console.log("top_lvl width = " + nw);
	
	//chache vars
	var ww, st, lw, lh, nw, nh, ew, hh;
	var $externals = $("header .externals");
	var $nav = $("#nav_wrapper");
	var $logoImg = $("#header_logo");
	var $nav2 = $(".nav_2");
	var $body = $("body");
	$window.on("scroll resize", function(){
		ww = $window.width();
		st = $(document).scrollTop();
		
		//console.log("resize to " + $window.width());
		//console.log("scroll to " + st);
		
		//fade-ins
		check_if_in_view();
		
		//clac logo size
		if(ww < 272){
			lw = 0; //display:none
		}
		else if(ww < 500){
			lw = st == 0 ? ww-50 : 222;
		}else{
			lw = st == 0 ? 400 : 222;
		}
		lh = lw*676/3000 + 4;//wrapping logo anchor tag add 4 pixels
		
		$logo.show();
		if(ww < lw+100) $logo.css("margin-left",50);
		else $logo.css("margin","auto");		
		
		ew = $externals.width();
		
		//dynamic css
		nh = 0;
		if(ww > lw+nw+ew){
			$externals.show();
			$nav.css({"flex":"1", "display":"block"});
			$nav2.hide();
		}else if(ww > lw+nw){
			$externals.hide();
			$nav.css({"flex":"1", "display":"block"});
			$nav2.hide();			
		}else if(ww > nw){
			$externals.hide();
			$nav.css({"flex":"100%", "display":"block"});
			$nav2.hide();
			lh -= 4; //except in this case ???
			nh = $(".top_lvl").height();
		}
		else{
			$externals.hide();
			$nav.hide();
			$nav2.show();
			$("#menu_close").hide();
		}
		
		//calc header height
		var hh = lh + nh;
		if(lw == 0){
			$logo.hide();
			return;
		}
		
		/*
		console.log("ww = " + ww + " hw = " + (lw+nw+ew) + 
					"\nlw = " + lw + " nw = " + nw + " ew = " + ew + 
					"\nlh = " + lh + " hh = " + hh);
		*/
		
		//animate if needed
		if(st > 0 && $logo.data('size') == 'big'){
			$logo.data('size','small');
			$logo.stop().animate({width:lw},300,padd_main(true,hh));
		}else if(st == 0 && $logo.data('size') == 'small'){
			$logo.data('size','big');
			$logo.stop().animate({width:lw},300,padd_main(true,hh));
		}else{
			$logo.width(lw);
			padd_main(false, hh);
		}
		
		//parallax
		bgPos = "0 " + st*-0.25 + "px, 0 " + st*-0.75 + "px";
		//console.log("bg pos = " + bgPos);
		$("body").css("background-position", bgPos);
	});
	
	$(document).trigger("scroll");
});

function padd_main(animate = false, height = $("header").height()){
	//console.log("padd_main " + height + " animate = " + animate);
	if(animate){
		var t = $(document).scrollTop();
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

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
  
  //console.log("wh " + window_height);
  //console.log("wt " + window_top_position);
  //console.log("wb " + window_bottom_position);
  
  //console.log("ael " + $animation_elements.length);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.height();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
	
	//console.log("eh " + element_height);
	//console.log("et " + element_top_position);
	//console.log("eb " + element_bottom_position);

    //check to see if this current container is within viewport
    if (element_bottom_position >= window_top_position &&
        element_top_position <= window_bottom_position) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
	
	/*
	var x = 60;
    if (!$element.hasClass("in-view") && 
		(element_bottom_position-x >= window_top_position) &&
        (element_top_position+x <= window_bottom_position)) {
      $element.addClass('in-view');
    } else if($element.hasClass("in-view") &&
		((element_bottom_position-(x-10) <= window_top_position) ||
        (element_top_position+(x-10) >= window_bottom_position))) {
      $element.removeClass('in-view');
    }
	*/
  });
}