var menu_show = true;

$(document).ready(function(){	
	$("#menu_wrapper").click(function(event){
		event.stopPropagation();
		if(menu_show){
			$("#nav_3").animate({
				left: "0"
			}, 300);
			$("#menu_open").hide();
			$("#menu_close").show();
			menu_show = false;
		}else{
			menu_close();
		}
	});
	$("html").click(function() {
		if(!menu_show){
			menu_close();
		}
	});
	
	/*
	padd_main();
	$(window).resize(function(){
		padd_main();
	});
	
	var $header = $("#header_logo");
	$header.data('size','big');
	$(window).scroll(function(){
		if($(document).scrollTop() > 0){
			if($header.data('size') == 'big'){
				$header.data('size','small');
				$header.stop().animate({
					width:'200px'
				},300);
			}
		}else{
			if($header.data('size') == 'small'){
				$header.data('size','big');
				$header.stop().animate({
					width:'400px'
				},300);
			} 
		}
	});
	*/
});

function padd_main(){
	$("main").css("padding-top", $("header").height());
}

function menu_close(){
	$("#nav_3").animate({
		left: "-200px"
	}, 300);
	$("#menu_close").hide();
	$("#menu_open").show();
	menu_show = true;
}