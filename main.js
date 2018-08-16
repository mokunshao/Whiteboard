var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


function drawCircle(x,y){
	context.beginPath();
	context.arc(x,y,1,0,Math.PI*2);
	context.fill();
}

function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineWidth=5;
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath;
}

var painting = false;
var lastPoint={x:undefined, x:undefined}

canvas.onmousedown = function(point){
	painting = true;
	var x = point.clientX;
	var y = point.clientY;
	drawCircle(x,y);
	lastPoint = {x:x, y:y};
}

canvas.onmousemove = function(point){
	if (painting) {
		var x = point.clientX;
		var y = point.clientY;
		drawCircle(x,y);
		var newPoint ={x:x, y:y};
		drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
		lastPoint = newPoint;
	} else {	}
}

canvas.onmouseup = function(point){
	painting = false;
}