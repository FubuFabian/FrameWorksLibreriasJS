var iniciado = false;
var puntuaje = 0;
var movimientos = 0;
var del = false;

function finJuego(){
	
	$('.candy').draggable('disable');
	
	var fin = setInterval(function(){
		
		$('.panel-tablero').width(function(i, w) { return w - 5; });
		$('.panel-score').width(function(i, w) { return w + 5; });
		
		if($('.panel-tablero').width()===0){
			$('.panel-tablero').hide();
			$('.time').hide();
			clearInterval(fin);
		}
		
		
	},2);
	
}

function matchCandies(){
	
	var candy, candyImg;
	var candyLeft, candyImgLeft, candyRight, candyImgRight, candyUp, candyImgUp, candyDown, candyImgDown;
	
	for(var m=1;m<8;m++){
		for(var n=1;n<8;n++){
		
			
			candy =  ".col-" + m + " .row-" + n + " img";
			candyImg =  parseInt($(candy).attr('src').match(/\d+/)[0]);
			
			if((n-1)>0){
				
				candyLeft =  ".col-" + m + " .row-" + (n-1) + " img";
				candyImgLeft =  parseInt($(candyLeft).attr('src').match(/\d+/)[0]);
				
				if(candyImgLeft===candyImg){
					
					if((n+1)<8){
						
						candyRight =  ".col-" + m + " .row-" + (n+1) + " img";
						candyImgRight =  parseInt($(candyRight).attr('src').match(/\d+/)[0]);
						
						if(candyImgRight===candyImg){
							
							$(candy).addClass('match');
							$(candyLeft).addClass('match');
							$(candyRight).addClass('match');
							puntuaje += 30;
							$('#score-text').text(puntuaje);
							del = true;
							
						}
						
					}
					
				}
			}
				
			if((m-1)>0){

			candyUp =  ".col-" + (m-1) + " .row-" + n + " img";
			candyImgUp =  parseInt($(candyUp).attr('src').match(/\d+/)[0]);

				if(candyImgUp===candyImg){

					if((m+1)<8){

						candyDown =  ".col-" + (m+1) + " .row-" + n + " img";
						candyImgDown =  parseInt($(candyDown).attr('src').match(/\d+/)[0]);

						if(candyImgDown===candyImg){

							$(candy).addClass('match');
							$(candyUp).addClass('match');
							$(candyDown).addClass('match');
							puntuaje += 30;
							$('#score-text').text(puntuaje);
							del = true;

						}

					}

				}

			}	
			
		}
	}
	
	if(del){
		deleteCandies();
	}
	
}

function deleteCandies(){
	
	$('.match').effect('pulsate',1000,function(){
		$('.match').remove();
	});
	
	setTimeout(dropCandies,1500);
	
}

function dropCandies(){
	
	for(var cols=1;cols<8;cols++){
		for(var rows=7;rows>0;rows--){
			
			var candyEmpty =  ".col-" + cols + " .row-" + rows;
			if($(candyEmpty).is(':empty')){
				
				var found = false;
				
				for(var rows2=rows-1;rows2>0;rows2--){
					
					var candyNonEmpty =  ".col-" + cols + " .row-" + rows2;
					if(!$(candyNonEmpty).is(':empty')){
						
						var candyNonEmptyImg =  candyNonEmpty + " img";
						var temp = $(candyNonEmptyImg).detach();
						$(candyEmpty).append($(temp));
						
						found = true;
						break;
						
					}
		
				}
				
				if(!found){
					var imageNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
					var img = '<img class="candy" src="image/'+ imageNumber + '.png" />';
					$(candyEmpty).append(img);
					$('.candy').draggable({
						start: function() {
            			$(this).off("click");
        				}
					});
				}
		
			}
	
		}
	}
	
	matchCandies();
	
}

function changeWhite(element){
	$(element).animate(
		{
			color: '#FFF'
		},1000,function(){
			changeYellow(element);
		}
	);
}


function changeYellow(element){
	$(element).animate(
		{
			color: 'yellow'
		},1000,function(){
			changeWhite(element);
		}
	);
}

function inicio(){
	
	var columns = $('div[class^="col"]');
	var max = 4;
	var min = 1;
	
	for(var i=0;i<columns.length;i++){
		
		for(var j=0;j<7;j++){
			var imageNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			var div = '<div class="dropCandy row-' + (j+1) + '"><img class="candy" src="image/'+ imageNumber + '.png" /></div>';
			$(columns[i]).append(div);
		}
	}
	
}

function iniciar(btn){
	
	iniciado = true;
	$(btn).text('Reiniciar');
	
	inicioTimer();
	
	$('.candy').draggable({
		start: function() {
            $(this).off("click");
			
        }
	});
	
	$(".dropCandy").droppable({
		accept: ".candy",
		drop: function(event, ui){
			
			var parent = $(ui.draggable).parent();
			
			var dropRow = parseInt($(this).attr('class').split(' ')[1].match(/\d+/)[0]);
			var dragRow = parseInt($(parent).attr('class').split(' ')[1].match(/\d+/)[0]);
			var dropCol = parseInt($(this).parent().attr('class').match(/\d+/)[0]);
			var dragCol = parseInt($(parent).parent().attr('class').match(/\d+/)[0]);
			
			var temp;
			
			if(dragCol===dropCol){
				
				if(( dropRow === (dragRow-1) ) || ( dropRow === (dragRow+1) )){
					
					temp = $(this).find($('img')).detach();
					$(parent).append($(temp));
					$(ui.draggable)
					.css({
					position: "relative",
					left: "auto",
					top: "auto"
					})
					.appendTo($(this));
					
					movimientos++;
					$('#movimientos-text').text(movimientos);
					matchCandies();
					
				}else{
					
					$(ui.draggable)
					.css({
					position: "relative",
					left: "auto",
					top: "auto"
					})
					.appendTo($(parent));
				
				}	
				
			}else if(( dropCol === (dragCol-1) ) || ( dropCol === (dragCol+1) )){
				
				if(dragRow===dropRow){
					
					temp = $(this).find($('img')).detach();
					$(parent).append($(temp));
					$(ui.draggable)
					.css({
					position: "relative",
					left: "auto",
					top: "auto"
					})
					.appendTo($(this));
					
					movimientos++;
					$('#movimientos-text').text(movimientos);
					matchCandies();
					
				}else{
					
					$(ui.draggable)
					.css({
					position: "relative",
					left: "auto",
					top: "auto"
					})
					.appendTo($(parent));
					
				}
				
			}else{
				
				$(ui.draggable)
				.css({
				position: "relative",
				left: "auto",
				top: "auto"
				})
				.appendTo($(parent));
				
			}
			
			
			
			
		}
	});

	matchCandies();
	
}

$(function(){
	
	changeWhite($('.main-titulo'));	
	inicio();
	
	$('.btn-reinicio').on('click',function(){
		
		if(iniciado){
			location.reload();
		}else{
			iniciar($(this));
		}
		
	});
	
	
});