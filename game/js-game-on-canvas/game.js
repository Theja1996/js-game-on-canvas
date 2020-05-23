var canvas;
var canvasContext;
var dotX = 50;

window.onload = function(){

	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var framePerSecond =30;

	setInterval( function(){
		dispaly();
	move();
	},1000/framePerSecond);

}

function move(){
		dotX = dotX + 10;
}

function dispaly(){

	canvasContext.fillStyle ="blue";
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
	canvasContext.fillStyle ="white";
	canvasContext.fillRect(0,200,10,100);
	canvasContext.fillStyle ="red";
	canvasContext.fillRect(dotX,100,10,10);
}