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


var circleWidth = 2;

// 画圆的函数
function drawCircle(x,y,circleWidth){
	context.beginPath();
	context.arc(x,y,circleWidth,0,Math.PI*2);
	context.fill();
}

var lineWidth =5;

// 画线的函数
function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineWidth=5;
	context.lineWidth=lineWidth;
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath;
}



// 允许创作
var creating = false;


// 使用画笔
var usingPen = true;

pen.onclick =function(){
	usingPen = true;
	usingEraser=false;
	pen.classList.add("active");
	eraser.classList.remove("active");
}


// 橡皮擦
var usingEraser = false;

eraser.onclick = function(){
	usingEraser = true;
	usingPen=false;
	eraser.classList.add("active");
	pen.classList.remove("active");
}




if(document.body.ontouchstart===null){
	// 按下鼠标
	canvas.ontouchstart = function(point){
		var x = point.touches[0].clientX;
		var y = point.touches[0].clientY;
		creating = true;
		if(usingPen===true){
			drawCircle(x,y,circleWidth);
			lastPoint = {x:x, y:y};
		}
		if(usingEraser === true){
			context.clearRect(x,y,10,10)
		}
	}
	// 鼠标移动
	canvas.ontouchmove = function(point){
		var x = point.touches[0].clientX;
		var y = point.touches[0].clientY;
		if (creating === false){
			return;
		} 
		if (usingEraser === true) {
			context.clearRect(x,y,10,10)
		} 
		if(usingPen===true){
			drawCircle(x,y,circleWidth);
			var newPoint ={x:x, y:y};
			drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
			lastPoint = newPoint;
		}
	}
	//松开鼠标
	canvas.ontouchend = function(point){
		creating = false;
	}
} 


if(document.body.ontouchstart===undefined){
	// 按下鼠标
	canvas.onmousedown = function(point){
		var x = point.clientX;
		var y = point.clientY;
		creating = true;
		if(usingPen===true){
			drawCircle(x,y,circleWidth);
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
			drawCircle(x,y,circleWidth);
			var newPoint ={x:x, y:y};
			drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
			lastPoint = newPoint;
		}
	}
	//松开鼠标
	canvas.onmouseup = function(point){
		creating = false;
	}
}


black.onclick=function(){
	context.fillStyle ='black';
	context.strokeStyle='black';
	black.classList.add('active');
	green.classList.remove('active');
	blue.classList.remove('active');
	red.classList.remove('active');
}

red.onclick=function(){
	context.fillStyle ='red';
	context.strokeStyle='red';
	red.classList.add('active');
	green.classList.remove('active');
	blue.classList.remove('active');
	black.classList.remove('active');
}

green.onclick=function(){
	context.fillStyle ='green';
	context.strokeStyle='green';
	green.classList.add('active');
	red.classList.remove('active');
	blue.classList.remove('active');
	black.classList.remove('active');
}

blue.onclick=function(){
	context.fillStyle ='blue';
	context.strokeStyle='blue';
	blue.classList.add('active');
	green.classList.remove('active');
	red.classList.remove('active');
	black.classList.remove('active');
}

normal.onclick = function(){
	lineWidth=5;
	circleWidth = 2;
	normal.classList.add('active');
	bold.classList.remove('active');
}

bold.onclick = function(){
	lineWidth=10;
	circleWidth =5;
	bold.classList.add('active');
	normal.classList.remove('active');
}

clear.onclick = function(){
	context.clearRect(0,0,canvas.width,canvas.height);
}

download.onclick = function(){
	var url = canvas.toDataURL("image/png");
	var a = document.createElement('a');
	a.download = '我的作品';
	a.href = url;
	a.target = '_blank';
	a.click();
}