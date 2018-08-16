// 前置准备工作
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


// 设置页面大小
function setPageSize(){
	var pageWidth = document.documentElement.clientWidth;
	var pageHeight = document.documentElement.clientHeight;
	canvas.width = pageWidth;
	canvas.height = pageHeight;
}

setPageSize();

window.onresize = function(){
	setPageSize();	
}


// 画圆画线的函数
function drawCircle(x,y){
	context.beginPath();
	context.arc(x,y,2,0,Math.PI*2);
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



// 起始点
var lastPoint={x:undefined, x:undefined}


// 允许创作
var creating = false;


// 使用画笔
var usingPen = true;

pen.onclick =function(){
	usingPen = true;
	usingEraser=false;
}


// 橡皮擦
var usingEraser = false;

eraser.onclick = function(){
	usingEraser = true;
	usingPen=false;
}



//鼠标按下后
canvas.onmousedown = function(point){
	var x = point.clientX;
	var y = point.clientY;
	creating = true;
	if(usingPen===true){
		drawCircle(x,y);
		lastPoint = {x:x, y:y};
	}
	if(usingEraser === true){
		context.clearRect(x,y,10,10)
	}
}


// 鼠标移动
canvas.onmousemove = function(point){
	var x = point.clientX;
	var y = point.clientY;
	if (creating === false){
		return;
	} 
	if (usingEraser === true) {
		context.clearRect(x,y,10,10)
	} 
	if(usingPen===true){
		drawCircle(x,y);
		var newPoint ={x:x, y:y};
		drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
		lastPoint = newPoint;
	}
}


//松开鼠标
canvas.onmouseup = function(point){
	creating = false;
}