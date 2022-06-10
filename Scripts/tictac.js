const X_CLASS = 'x'
const CIRCLE_CLASS ='circle'
const cellemlements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const WIN_STATES = [
    [0,1,2],
    [4,3,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cellemlements.forEach(cell =>{
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()

}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    //place mark

    //check for win
    //check for draw
    
    swapTurns()
    setBoardHoverClass()
    //swtich turns 
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }

}