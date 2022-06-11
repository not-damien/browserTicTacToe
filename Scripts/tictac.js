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
let circleTurn //Boolon false means it is X's turn, true means it is circles turn 

//call to start game to start the game 
startGame()


/**
 * Gets the game ready to play and reset the board
 */
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
/**
 * game logic for when a playeer clicks selects a position on the board 
 * @param {*} e 
 */
function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    //place mark

    //check for win
    //check for draw
    if(checkWin(currentClass)){
        gameOver(false)
    }else if(checkDraw()){
        gameOver(true)
    }
    swapTurns()
    setBoardHoverClass()
    //swtich turns 
}
/**
 * places the class given into the cell given 
 * @param {} cell 
 * @param {*} currentClass 
 */
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
/**
 * swaps turns 
 */
function swapTurns(){
    circleTurn = !circleTurn
}
/**
 * based on whose turn it is this function handles the hoover effect 
 */
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }

}
/**
 * checks if there is a win state based on the current move 
 * @param {*} currentClass 
 * @returns 
 */
function checkWin(currentClass){
    return WIN_STATES.some(combination => {
        return combination.every(index => {
            return cellemlements[index].classList.contains(currentClass)
        })
    })
}
/**
 * ends the game and handles displaying the end screen
 * @param {*} tie 
 */
function gameOver(tie){
    if(tie){
       winningMessageText.innerText = 'Draw!'
    }else{
        winningMessageText.innerText =  `${circleTurn ? "O Wins!" : "X Wins!"}`//todo fix this selector 
    }
    winningMessageEL.classList.add('show')
}
/**
 * checks if the game ended in a tie
 * @returns 
 */
function checkDraw(){
    return [...cellemlements].every(cell=>{ 
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}