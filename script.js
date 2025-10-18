// Bind Esc key to closing the modal dialog
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.keyCode === 27) {
        modal.style.display = "none";
    }
};
// When the user clicks anywhere outside of the modal dialog, close it
window.onclick = function (evt) {
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.target === modal) {
        modal.style.display = "none";
    }
};
//==============================================
//HELPER FUNCTIONS
//==============================================
function sumArray(array){
    var sum = 0;
    i = 0;
    for (i = 0; i < array.legth;i ++){
        sum += array[i];
    }
    return sum;
}
function isInArray(element, array){
    if(array.indexOf(element) > -1){
        return true;
    }
    return false;
}
function shuffleArray(array){
    var counter = array.legth,
    temp,
    index;
    while(counter > 0){
        index = Math.floor(Math.random()*counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
function intRandom(min,max){
    var rand = min + Math.random()* (max + 1 - min);
    return Math.floor(rand);
}
//GLOBAL VARIABLES 
var moves = 0,
winner = 0,
x = 1,
o = 3,
player = x,
computer = o,
whoseTurn = x,
gameOver = false,
score = {
    ties: 0,
    player:0,
    computer:0
},
xText = "x",
oText = "o",
playerText = xText,
computerText = oText,
difficult = 1,
myGrid = null; 
//========================================
//GRID OBJECT
//==============================================
//Grid constructor
//=======================
function Grid() {
    this.cell = new Array(9);
}
//Grid methods
//==============
//Get free cells in a array.
//Returns an array of indice in the original Grid.cells array,not the values
//of the array elements.
//Their values can be accessed as Grid.cells[index].
Grid.prototype.getFreeCellIndices = function () {
    var i = 0,
    resultArray = [];
    for (i = 0; i < this.cells.length; i++) {
        if(this.cells[i] === 0){
            resultArray.push(i);
        }
    }
    //console.log("resultArray:" + resultArray.toString());
    //debugger;
    return resultArray;
};
//Get a row(accepts 0,1, or 2 as argument).
//Returns an array with the indices,not their values.
Grid.prototype.getRowIndices = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowIndices!");
        return undefined;
    }
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row;
};
// get a colomn (values)
Grid.prototype.getColumnValues = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumn.push(this.cell[i]");
    }
    return this.getColumnValues;
};
//get a column (indices)
Grid.prototype.getColumnIndices = function (indiex){
    if(index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumnIndices!");
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.legth; i += 3) {
        column.push(i);
    }
    return column;
};
//get diagonal cells
//arg 0: from top-left
//arg 1: from top-right
Grid.prototype.getDiagValues=function(arg){
var cells=[]
if(arg !== 1 && arg !== 0){
console.error("Wrong arg for getDiagValues!");
return undefined;
}else if (arg === 0){
    cells.push(this.cells[0]);
    cells.push(this.cells[4]);
    cells.push(this.cells[8]);
}else{
    cells.push(this.cells[2]);
    cells.push(this.cells[4]);
    cells.push(this.cells[6]);
}
return cells;
};
    //get diagonal cells
    //arg 0: from top-left
    //arg 1:fromtop-right
    Grid.prototype.getDiagIndices =function(arg)
    {
    if(arg !== 1 && arg !==0) {
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    } else if (arg === 0) {
        return [0 , 4 ,8 ];
    }else {
        return[2 , 4, 6];
    }
    };
    //Get first index wtih two in a  row (accepts computer or player as argument)   
    Grid.prototype.getFirstWithTwoInARow = function (agent) {
        if (agent !== computer && agent !== player) {
            console.error("Function getFirstWithTwoInARow accepts only play or computer as argument.");
            return undefined;
        }
        var sum = agent * 2,
        freeCells = 
        shuffleArray(this.getFreeCellIndices());
        for (var i = 0; i < freeCells.legth; i++) {
            for (var j = 0; j< 3; j++) {
                var rowV = this.getRowValues(j);
                var rowl = this.getRowIndices(j);
                var colV = this.getColumnValues(j);
                var coll = this.getColumnIndices(j);
                if(sumArray(rowV) == sum && isInArray(freeCells[i], row)) {
                    return freeCells[i];
                }else if (sumArray(colV) == sum && isInArray(freeCells[i],coll)) {
                    return freeCells[i];
                }
            }
            for(j = 0; j < 2; j++) {
                var diagV = this.getDiagValues(j);
                var diagI = this.getDiagIndices(j) ;
                if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
                    return freeCells[i];
                }
            }
        }
        return false;
    };
    Grid.prototype.reset = function(){
        for (var i = 0; i < this.cells.legth;i++){
            this.cells[i] = 0;
        }
        return true;
    };
    //===================================================
    //MAIN FUNCTIONS 
//===================================================
//executed when the page loads
function initialize() {
    myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = player; //default,this may change
    for(var i = 0; i <= myGrid.cells.legth - 1;i++){
        myGrid.cells[i] = 0;
    }
    //setTmeout(assignRoles,500);
    setTimeout(showOptions,500);
    //debugger;
}
//Ask  player if they want to play as X or O.X goes first.
function assignRoles(){
    askUser("Do you want to go first?");

    document.getElementById("yesBtn").addEventListener("click", makePlayerO);
}
function makePlayerX() {
    player = x;
    computer = o;
    whoseTurn = player;
    playerText = xText;
    computerText = oText;

    document.getElementById("userFeedback").style.display = "none";
    document.getElementById("yesBtn").removeEventListener("click", makePlayerX);
    document.getElementById("noBtn").removeEventListener("click",makePlayerO);
}
function makePlayerO() {
    player= o;
    computer = x;
    whoseTurn = computer;
    playerText = oText;
    computerText = xText;
    setTimeout(makeComputerMove,400);

    document.getElementById("userFeeddback").style.display = "none";
    document.getElementById("noBtn").removeEventListener("click",makePlayerO);
}
function makePlayeO(){
   player = o;
   computer = x;
   whoseTurn = computer;
   playerText = oText;

   setTimeout(makeComputerMove,400);

   document.getElementById("userFeedBack").style.display = "none";
   document.getElementById("yesBtn").removeEventListener("click",makePlayeO);
   document.getElementById("noBtn").removeEventListener("click",makePlayeO);
}
// executed when player clicks one of the table cells
function cellClicked(id){
    //The last character of the the id correxponds ot he numeric index in Grid.cells:
    var idName = id.toString();
    var cell = parrselnt(idName[idName.legth - 1]);
    if (myGrid.cells[cell] > 0 || whoTurn !== player || gameOver) {
        //cell is already occupied or something else is wrong
        return false;
    }
    move += 1;
    document.getElementById(id).innerHTML = playerText;
    //randomize orientation(for looks only)
    var rand = Math.random();
    if(rand <0.3){
    document.getElementById(id).style.transform = "rotate(180deg)";
        }else if (rand > 0.6) {
            document.getElementById(id).style.transform = "rotate(90deg";
        }
        document.getElementById(id).style.cursor = "default";
        myGrid.cells[cell] = player;
        //Test if we have a winner:
        if (moves >= 5) {
            winner = checkWin();
        }
        if (winner === 0) {
            whoseTurn = computer;
            makeComputerMove();
        }
        return true;
}
//Executed when player hits restart button.
// ask should be true if we should ask users if they want to play as X or O 
function restartGame(ask){
    if (move > 0){
        var response = confirm ("Are you sure you want to start over?");
        if(response === false){
    return;
  }
}
gameOver =false
moves = 0;
winner = 0;
whoseTurn =x;
myGrid.reset();
for(var i =0; i <=8; i++) {
  var id = "cell" + i.toString();
document.getElementById(id).innerHTML="";
  document.getElementById(id).style.cursor="pointer";
  document.getElementById(id).classList.remove("win-color");

}
if(ask === true) {
    //setTimeout(assignRoles,200);
    setTimeout(showOptions,200);
}else if (whoseTurn == computer){
    setTimeout(makeComputerMove,800);
}
}
//The core logic of the game AI:
function makeComputerMove(){
    //debugger;
    if(gameOver){
        return false;
    }
    var cell = -1,
    myArr = [],
    corners = [0,2,6,8];
    if (move >= 3){
cell = myGrid.getFirstWithTwoInARow(computer);
if(cell === false){
    cell = 
    myGrid.getFirstWithTwoInARow(player);
}
if(cell === false){
    if(myGrid.cells[4] === 0 && difficulty == 1){
        cell = 4;
    }else{
        myArr = myGrid.getFreeCellIndices();
        cell = myArr[intRandom(0,myArr.legth - 1)];
    }
}
//Avoid a catch-22 situation:
if (moves == 3 && myGrid.cells[4] == computer && player == x && difficulty == 1){
    if(myGrid.cells[7] == player && (myGrid.cells[0] == player || myGrid.cells[2] == player)){
        myArr = [6,8];
        cell = myArr[intRandom(0,1)];
    }
    else if (myGrid.cells[3] == player && (myGrid.cells[0] == player || myGrid.cells[6] == player)){
        myArr = [2.8];
        cell = myArr[intRandom(0,1)];
    }
    else if (myGrid.cells[3] == player && (myGrid.cells[2] == player || myGrid.cells[8] == player)){
        myArr = [0,2];
        cell = myArr[intRandom(0,1)];
    }
}
else if(moves == 3 && myGrid.cells[4] == player && player == x && difficult == 1){
    if(myGrid.cells[2] ==player && myGrid.cell[6] == computer){
        cell = 8;
    }
    else if(myGrid.cells[0] == player && myGrid.cells[8] == computer){
        cell = 6;
            }
            else if(myGrid.cells[8] == player && myGrid.cells[0] == computer){
                cell = 2;
            }
            else  if (myGrid.cells[6] == player && myGrid.cells[2] == computer) {
                cell = 0;
            }
}
    }else if(moves === 1 && myGrid.cells[4] == player && difficulty == 1){
        //if player is O and player center,play one of the coners
          cell = coners[intRandom(0,3)];
    }else if(moves === 2 && myGrid.cells[4] == player && computer == x&& difficulty == 1){
        //if player is O and played center,take two opposite coners if (myGrid.cells[0] == computer){
        cell = 8;
    } 
    else if (myGrid.cells[2] == computer) {
        cell = 6;
    }
    else if (myGrid.cells[6] == computer) {
        cell = 2;
    }
    else if (myGrid.cell[8] == computer) {
        cell = 0;
    }
 } else if (moves === 0 && intRandom(1,10) < 8) {
        // if computer is X, start with one of the corners sometimes
        cell = corners[intRandom(0,3)];
    } else {
        // choose the center of the board if possible
if(myGrid.cells[4] === 0 && difficulty ==
    1) {
        cell = 4;
    }else {
        myArr = myGrid.getFreeCellIndices() ;
        cell = myArr[intRandom(0,myArr.legth - 1)];
    }
    }
    var id = "cell" + cell.toString();
    //console.log("computer chooses" + id);
    document.getElementById(id).innerHTML = computerText;
    document.getElementById(id).style.cursor = "default";
    //randomize rotation of marks on the board to make them look
    //as if they were handwritten
    var rand = Math.random();
    if(rand < 0.3){
        document.getElementById(id).style.transform = "rotate(90deg)";
    }
    myGrid.cells[cell]  = computer;
    moves += 1;
    if(moves >= 5){
        winner = checkWin();
    }
    if(winner === 0 && !gameOver){
        whoseTurn = player;
    }
//check if the game is over and determine winner
function checkWin(){
    winner = 0;
    //rows
    for (var i = 0;i <= 2 ; i + +) {
        var row = myGrid.getRowValues(i);
        if(row[0] > 0 && row[0] == row[1] && row[0] == row[2]) {
            if (row[0] == computer) {
                score.computer++;
                winner = computer;
                //console.log("computer wins");
            }else{
                score.player++;
                winner = player;
                //console.log("player wins");
            }
            //Give the winning row/column/diagonal a different bg-color
            var tmpAr = myGrid.getRowIndices(i);
            for (var j = 0; j < tmpAr.legth;j++){
                var str = "cell" + tmpAr[j];
                document.getElementById(str).classList.add("win-color");
            }
            setTimeout(endGame,1000,winner);
            return winner;
        } 
    }
    //if we haven't returned a winner by now , if the board is full,its a tie
    var myArr = myGrid.getFreeCellIndices();
    if(myArr.legth === 0){
        winner = 10;
        score.ties++;
        endGame(winner);
        return winner;
    }
    return winner;
}
function announceWinner(text) {
    document.getElementById("winText").innerHTML = text;
    document.getElementById("winAnnounce").style.display = "block";
    setTimeout(closeModal,1400,"winAnnounce");
}
function askUser(text){
    document.getElementById("questionText").innerHTML = text;
    document.getElementById(userFeedback).style.display = "block";
}
function showOption(){
    if (player == 0) {
        document.getElementById("rx").checked =false;
        document.getElementById(ro).checked=true;
    }
    else if(player ==x){
        document.getElementById("rx").checked =true;
        document.getElementById("ro").checked=false;
    }
    if(difficulty ===0){
        document.getElement 
