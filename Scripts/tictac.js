const X_CLASS = 'x'
const CIRCLE_CLASS ='circle'
const cellemlements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageEL = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartbutton = document.getElementById('winning-button')
restartbutton.onclick = startGame
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
    winningMessageEL.classList.remove('show')
    circleTurn = false
    cellemlements.forEach(cell =>{
        cell.addEventListener('click', handleClick, {once: true})
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(X_CLASS)
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
    if(checkWin(currentClass)){
        gameOver(false)
    }
    if(checkDraw()){
        gameOver(true)
    }
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

function checkWin(currentClass){
    return WIN_STATES.some(combination => {
        return combination.every(index => {
            return cellemlements[index].classList.contains(currentClass)
        })
    })
}

function gameOver(tie){
    if(tie){
       winningMessageText.innerText = 'Draw!'
    }else{
        winningMessageText.innerText =  `${circleTurn ? "O Wins!" : "X Wins!"}`//todo fix this selector 
    }
    winningMessageEL.classList.add('show')
}
function checkDraw(){
    return [...cellemlements].every(cell=>{ 
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}