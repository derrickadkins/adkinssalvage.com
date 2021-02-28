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
});

function menu_close(){
	$("#nav_3").animate({
		left: "-200px"
	}, 300);
	$("#menu_close").hide();
	$("#menu_open").show();
	menu_show = true;
}