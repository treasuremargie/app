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
        console.error("Wrong arg for get")
    }
}