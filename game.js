var canvas;
var canvasContext;
var dotX = 50;
var dotXSpeed = 10;

var dotY = 50;
var dotYSpeed = 4;

var paddle1Y = 250;
const paddleHeight = 100;

var paddle2Y = 250;
const paddleThickness = 10;

var p1Score =0;
var p2Score =0;

const win_game = 5 ;

var show_Winner = false;


function handleMouseClick(evt){
	if(show_Winner){
		p1Score = 0;
		p2Score=0;
		show_Winner = false;
	}
}

window.onload = function(){

	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var framePerSecond =30;

	setInterval( function(){
		dispaly();
	move();
	},1000/framePerSecond);

		canvas.addEventListener("mousedown",handleMouseClick);

		canvas.addEventListener("mousemove" , 
			function(evt){
				var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - paddleHeight/2;
		})


}

function dotReset(){

	if(p1Score>= win_game || p2Score >= win_game){
		
		show_Winner =  true;
	}


	dotXSpeed = -dotXSpeed;
	dotX = canvas.width/2;
	dotY = canvas.height/2;
}


function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
			x:mouseX,
			y:mouseY

	};

}

function pcMove(){
	var paddle2YCent = paddle2Y + (paddleHeight/2);


		if(paddle2YCent < dotY - 35){
		paddle2Y +=6;
	}else if(paddle2YCent > dotY +35){
		paddle2Y -= 6;
	}
}

function move(){

		pcMove();
		
		dotX = dotX + dotXSpeed;
		dotY = dotY + dotYSpeed;
		if (dotX > canvas.width){
				if(dotY > paddle2Y && dotY < paddle2Y + paddleHeight){
					dotXSpeed = - dotXSpeed;


					var betaY = dotY - (paddle2Y+paddleHeight/2);
					dotYSpeed = betaY * 0.35;


				}else{
						p1Score++;
						dotReset();
						
				}
						  
		}
		else if(dotX < 0){

				if(dotY > paddle1Y && dotY < paddle1Y + paddleHeight){
					dotXSpeed = - dotXSpeed;

					var betaY = dotY - (paddle1Y+paddleHeight/2);
					dotYSpeed = betaY * 0.35;



				}else{
						p2Score++;
						dotReset();
						

				}
						  }

		if (dotY > canvas.height){
			dotYSpeed = -dotYSpeed;
		}
		else if(dotY < 0){
			dotYSpeed = -dotYSpeed;
		}
}



function net(){
	for (var i = 0; i < canvas.height; i+=40) {
		disRectangle(canvas.width/2-1,i,2,20,"white");

	}
		
}


function dispaly(){
	 //create canvase
	disRectangle(0,0,canvas.width,canvas.height,"#29ab87");

if(show_Winner){
		canvasContext.fillStyle = "white";

		if(p1Score >= win_game){
			canvasContext.fillText("Left Player won !",350,200);
		}else if(p2Score >= win_game){
			canvasContext.fillText("Right Player won !",350,200);
		}
	canvasContext.fillText("click to continue",350,500);
	return;
}



    net();

	//create left side bar
	disRectangle(0,paddle1Y,paddleThickness,paddleHeight,"white");



	//create right side bar
	disRectangle(canvas.width- paddleThickness,paddle2Y,paddleThickness,paddleHeight,"white");


	//create dot
	disCircle(dotX, dotY, 7, "white");

	//display score

	canvasContext.fillText(p1Score,100,100);
	canvasContext.fillText(p2Score,canvas.width - 100,100);
}


function disCircle(centX, centY, radius, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centX, centY, radius, 0,Math.PI*2,true);
	canvasContext.fill();

}
function disRectangle(leftX, topY, width , height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width , height, color);


}


