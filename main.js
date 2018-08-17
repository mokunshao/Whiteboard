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


// 画圆的函数
function drawCircle(x,y){
	context.beginPath();
	context.arc(x,y,2,0,Math.PI*2);
	context.fill();
}

// 画线的函数
function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineWidth=5;
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
}


// 橡皮擦
var usingEraser = false;

eraser.onclick = function(){
	usingEraser = true;
	usingPen=false;
}


// 执行监听用户行为
userAction(canvas);	


//监听用户行为的函数
function userAction(canvas){

	if(document.body.ontouchstart===null){

		// 按下鼠标
		canvas.ontouchstart = function(point){
			var x = point.touches[0].clientX;
			var y = point.touches[0].clientY;
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
				drawCircle(x,y);
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
	}
}







