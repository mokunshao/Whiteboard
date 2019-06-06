// 前置准备工作
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// 设置页面大小
function setPageSize() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
}

setPageSize();

// window.onresize = function() {
//   setPageSize();
// };

var circleWidth = 2;

// 画圆的函数
function drawCircle(x, y, circleWidth) {
  context.beginPath();
  context.arc(x, y, circleWidth, 0, Math.PI * 2);
  context.fill();
}

var lineWidth = 5;

// 画线的函数
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath;
}

function switchToPen() {
  usingPen = true;
  usingEraser = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
}

function switchToEraser() {
  usingEraser = true;
  usingPen = false;
  eraser.classList.add("active");
  pen.classList.remove("active");
}

pen.onclick = switchToPen;

eraser.onclick = switchToEraser;

// 是否正在创作
var creating = false;

// 使用画笔
var usingPen = true;

// 橡皮擦
var usingEraser = false;

var lastPoint = {
  x: null,
  y: null
};

if (document.body.ontouchstart === null) {
  // 按下手指
  canvas.ontouchstart = function(point) {
    var x = point.touches[0].clientX;
    var y = point.touches[0].clientY;
    creating = true;
    if (usingPen === true) {
      drawCircle(x, y, circleWidth);
      lastPoint = { x: x, y: y };
    }
    if (usingEraser === true) {
      context.clearRect(x, y, 10, 10);
    }
  };
  // 手指移动
  canvas.ontouchmove = function(point) {
    var x = point.touches[0].clientX;
    var y = point.touches[0].clientY;
    if (creating === false) {
      return;
    }
    if (usingEraser === true) {
      context.clearRect(x, y, 10, 10);
    }
    if (usingPen === true) {
      drawCircle(x, y, circleWidth);
      const newPoint = { x: x, y: y };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };
  //松开手指
  canvas.ontouchend = function(point) {
    creating = false;
  };
}

if (document.body.ontouchstart === undefined) {
  // 按下鼠标
  canvas.onmousedown = function(point) {
    var x = point.clientX;
    var y = point.clientY;
    creating = true;
    if (usingPen === true) {
      drawCircle(x, y, circleWidth);
      lastPoint = { x: x, y: y };
    }
    if (usingEraser === true) {
      context.clearRect(x, y, 10, 10);
    }
  };
  // 鼠标移动
  canvas.onmousemove = function(point) {
    var x = point.clientX;
    var y = point.clientY;
    if (creating === false) {
      return;
    }
    if (usingEraser === true) {
      context.clearRect(x, y, 10, 10);
    }
    if (usingPen === true) {
      drawCircle(x, y, circleWidth);
      const newPoint = { x: x, y: y };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };
  //松开鼠标
  canvas.onmouseup = function(point) {
    creating = false;
  };
}

black.onclick = function() {
  context.fillStyle = "black";
  context.strokeStyle = "black";
  black.classList.add("active");
  green.classList.remove("active");
  blue.classList.remove("active");
  red.classList.remove("active");
  switchToPen();
};

red.onclick = function() {
  context.fillStyle = "red";
  context.strokeStyle = "red";
  red.classList.add("active");
  green.classList.remove("active");
  blue.classList.remove("active");
  black.classList.remove("active");
  switchToPen();
};

green.onclick = function() {
  context.fillStyle = "green";
  context.strokeStyle = "green";
  green.classList.add("active");
  red.classList.remove("active");
  blue.classList.remove("active");
  black.classList.remove("active");
  switchToPen();
};

blue.onclick = function() {
  context.fillStyle = "blue";
  context.strokeStyle = "blue";
  blue.classList.add("active");
  green.classList.remove("active");
  red.classList.remove("active");
  black.classList.remove("active");
  switchToPen();
};

normal.onclick = function() {
  lineWidth = 5;
  circleWidth = 2;
  normal.classList.add("active");
  bold.classList.remove("active");
  switchToPen();
};

bold.onclick = function() {
  lineWidth = 10;
  circleWidth = 5;
  bold.classList.add("active");
  normal.classList.remove("active");
  switchToPen();
};

clear.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

// download.onclick = function() {
//   var url = canvas.toDataURL("image/png");
//   var a = document.createElement("a");
//   // document.body.appendChild(a);
//   a.download = "我的作品";
//   a.href = url;
//   a.target = "_blank";
//   a.click();
// };

download.onclick = function() {
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.putImageData(
    context.getImageData(0, 0, canvas.width, canvas.height),
    0,
    0
  );
  context.globalCompositeOperation = "source-over";
  var imageURL = canvas.toDataURL("image/png");
  var downloadLink = document.createElement("a");
  downloadLink.href = imageURL;
  downloadLink.download = "mypaint";
  downloadLink.target = "_blank";
  downloadLink.click();
  if (usingPen === true) {
    document.querySelector(".colors .active").click();
  }
};
