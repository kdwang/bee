
$(document).ready(function() {

	// JQ UI tab
	$(".ui-widget-tabs").tabs();

	var tabs_2 = $('#tabs-2');

	var get_score = function(){

		$.get('http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/GetScores',

			function(data){
				var s = '';
				
				$(data).find('Score').each(function(){
					var name = $(this).children('name').text();
					var score = $(this).children('score').text();
					s += "<p>name:" + name + "&nbsp;&nbsp;&nbsp;&nbsp;" + "score:" + score + "</p>";
				});

				$('.bd', tabs_2).html(s);
			}
		)

	}
	
	get_score();

	var tab_score = $('.ui-widget-header li:last');
	
	tab_score.click(function() {
		get_score();
	});


})