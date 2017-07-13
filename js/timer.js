
var segundos = 00;
var minutos = 01;
var control;

function inicioTimer() {
	control = setInterval(cronometro,1000);

}
function pararTimer() {
	clearInterval(control);
	finJuego();

}
/*function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	$('#timer').text('02:00');

}*/

function cronometro () {
	
	if(segundos>0){
		segundos--;
		if(segundos<10){
			$('#timer').text("0" + minutos + ":0" + segundos);
		}else{
			$('#timer').text("0" + minutos + ":" + segundos);
		}
		
	}else if(segundos === 0){
		minutos--;
		if(minutos === -1){
			$('#timer').text("00" + ":0" + segundos);
			pararTimer();
		}else{
			segundos = 59;
			$('#timer').text("0" + minutos + ":" + segundos);
		}
		
	}
	
}
