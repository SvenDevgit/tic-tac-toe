 // globals
 //var c = document.getElementById('ttt-canvas');
var ctx = document.getElementById('ttt-canvas').getContext('2d');

var board = {
  square1 : { 
   xFrom: 0, 
   yFrom: 0,
   xTo: 150,
   yTo: 150,
   value : null,
   column : 1,
   row : 1,
   color: '#FF0000'
            },
  square2 : { 
   xFrom: 150, 
   yFrom: 0,
   xTo: 300,
   yTo: 150,
   value: null,
   column : 2,
   row : 1,
   color: '#F38585'
            },  
  square3 : { 
   xFrom: 300, 
   yFrom: 0,
   xTo: 450,
   yTo: 150,
   value: null,
   column : 3,
   row : 1,
   color: '#FF0000'
            },
  square4 : { 
   xFrom: 0, 
   yFrom: 150,
   xTo: 150,
   yTo: 300,
   value: null,
   column : 1,
   row : 2,
   color: '#F38585'
            },  
  square5 : { 
   xFrom: 150, 
   yFrom: 150,
   xTo: 300,
   yTo: 300,
   value: null,
   column : 2,
   row : 2,
   color: '#FF0000'
            },
  square6 : { 
   xFrom: 300, 
   yFrom: 150,
   xTo: 450,
   yTo: 300,
   value: null,
   column : 2,
   row : 3,
   color: '#F38585'
            },  
  square7 : { 
   xFrom: 0, 
   yFrom: 300,
   xTo: 150,
   yTo: 450,
   value: null,
   row : 3,
   column : 1,
   color: '#FF0000'
            },
  square8 : { 
   xFrom: 150, 
   yFrom: 300,
   xTo: 300,
   yTo: 450,
   value: null,
   column : 2,
   row : 3,
   color: '#F38585'
            },  
  square9 : { 
   xFrom: 300, 
   yFrom: 300,
   xTo: 450,
   yTo: 450,
   value: null,
   column : 3,
   row : 3,
   color: '#FF0000'
            }                                                      
};

gameState = {
  moves : 0, // amount of moves 
  played : 'N' // was ther played an X or an O
}; 

$(function(){
	console.log('ready to go');
    // register events
    var canvas = document.getElementById('ttt-canvas');
    $('#ttt-canvas').on('click', function(event){
       var mousePos = getMousePos(canvas, event);	
       //console.log('x' + mousePos.x + 'y' + mousePos.y)
       //$("span").text('x' + mousePos.x + ', y' + mousePos.y);
       playGame(getClickedSquare(mousePos));
    })
    // drwaw the tic tac toe board
    //drawBoard();   
    colorCanvasShapes(); 
});

function canvasClicked(mousePos){
	console.log(mousePos.x);
	if (mousePos.x < 150 && mousePos.y < 150){
           drawLine(10,0,10,100);
    }          
};

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawCircle(square){
  ctx.beginPath();
  ctx.strokeStyle='#ECECEC';
  ctx.lineWidth=5;
  ctx.arc(square.xFrom + 75, square.yFrom + 75,60,0,2*Math.PI);
  ctx.stroke();
}

function drawLine(vXf, vYf, vXt, vYt){
  ctx.beginPath(); 
  ctx.moveTo(vXf,vYf);
  ctx.lineTo(vXt,vYt);
  ctx.stroke();
}

function drawSquare(vXf, vYf, vXt, vYt){
  drawLine(vXf, vYf, vXt, vYf);
  drawLine(vXf, vYt, vXt, vYt);
  drawLine(vXf, vYf, vXf, vYt);
  drawLine(vXt, vYf, vXt, vYt);
}

function drawX(square){
  ctx.strokeStyle='#ECECEC';
  ctx.lineWidth=5;
  drawLine(square.xFrom+15, square.yFrom+15, square.xTo-15, square.yTo-15);
  drawLine(square.xFrom+15, square.yTo-15, square.xTo-15, square.yFrom+15);
}

function drawBoard(){
  for (let prop in board) {
    drawSquare(board[prop].xFrom, board[prop].yFrom, board[prop].xTo, board[prop].yTo);
   }
}

function getClickedSquare(mousePos){
  var square;
  for (let prop in board) {
    if (   board[prop].xFrom < mousePos.x 
        && board[prop].xTo > mousePos.x
        && board[prop].yFrom < mousePos.y
        && board[prop].yTo > mousePos.y){
        square = board[prop];
      }
    }
    return square;
  }

function playGame(square){
  var played = 'O';
  var resuLt;
  if (gameState.played == 'N' || gameState.played == 'O'){
    played = 'X';
  }
  gameState.moves += 1;
  gameState.played = played;   
  square.value = played;

  drawPlayed(square);
  if (checkPlayed() == 'XXX' || checkPlayed() == 'OOO'){
    alert(checkPlayed().substr(0,1) + ' won the Game');
    ctx.clearRect(0,0,450,450);
    //drawBoard();
    colorCanvasShapes(); 
    newGame();
  }
  if (gameState.moves == 9){
    alert('game over');
    ctx.clearRect(0,0,450,450);
    //drawBoard();
    colorCanvasShapes(); 
    newGame();
  }
}

function checkPlayed() {
  var result;
  var row = null;
  var checkX = 'XXX';
  var checkO = 'OOO';
  //get the relvevant squares
  if (   board.square1.value + board.square2.value + board.square3.value == checkX
      || board.square4.value + board.square5.value + board.square6.value == checkX
      || board.square7.value + board.square8.value + board.square9.value == checkX
      || board.square1.value + board.square4.value + board.square7.value == checkX
      || board.square2.value + board.square5.value + board.square8.value == checkX
      || board.square3.value + board.square6.value + board.square9.value == checkX
      || board.square1.value + board.square5.value + board.square9.value == checkX
      || board.square3.value + board.square5.value + board.square7.value == checkX){
    result = checkX;
  }
  else if 
     (   board.square1.value + board.square2.value + board.square3.value == checkO
      || board.square4.value + board.square5.value + board.square6.value == checkO
      || board.square7.value + board.square8.value + board.square9.value == checkO
      || board.square1.value + board.square4.value + board.square7.value == checkO
      || board.square2.value + board.square5.value + board.square8.value == checkO
      || board.square3.value + board.square6.value + board.square9.value == checkO
      || board.square1.value + board.square5.value + board.square9.value == checkO
      || board.square3.value + board.square5.value + board.square7.value == checkO){
    result = checkO;
  }
  return result;
  } //checkPlayed  

function drawPlayed(square){
  if (gameState.played == 'X'){
    drawX(square);
  }
  else{
    drawCircle(square);
  }
}

function newGame(){
  for (let prop in board) {
    board[prop].value = null;
  }  
  gameState.moves = 0;
  gameState.played = 'N';
}

function colorSquare(square){
  ctx.fillStyle = square.color;
  ctx.fillRect(square.xFrom, square.yFrom, square.xTo-square.xFrom , square.yTo-square.yFrom);
}  

function setSquareText(){
  ctx.font = '30px Arial';
  ctx.strokeText('Hello World',10,50);
}

function colorCanvasShapes(){
    var square;
    var fillstyle;
    for (let prop in board) {
      square = board[prop];
      colorSquare(square);
    }
}
