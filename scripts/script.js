


let game = {
    playerOne: null,
    playerTwo:null,
    isItPlayerOneTurn:true,
    turnCount:0,
    possibleWinsList : [
        // Rows
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        // Columns
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        // Diagonals
        [0, 4, 8], // Top-left to bottom-right diagonal
        [2, 4, 6]  // Top-right to bottom-left diagonal
      ],
    boxes:document.getElementsByClassName("box"),
    boxesArray:["","","","","","","","",""],
    // didPlayerOneWinLastGame:false,

    startGame:function(playerOneName,playerTwoName){
        this.playerOne = createPlayer(playerOneName);
        this.playerTwo = createPlayer(playerTwoName);
        document.getElementById("player-one-name").textContent = "Player One: " + this.playerOne.name;
        document.getElementById("player-two-name").textContent = "Player two: " + this.playerTwo.name;
        document.getElementById("player-one-score").textContent = "Score: " + this.playerOne.wins;
        document.getElementById("player-two-score").textContent = "Score: " + this.playerTwo.wins;

        if (this.isItPlayerOneTurn === true) {
            document.getElementById("player-turn").textContent = this.playerOne.name + "'s turn";
        }else{
            document.getElementById("player-turn").textContent = this.playerTwo.name + "'s turn";

        }
    },
    resetBoard:function(){
        for (let i = 0; i < this.boxes.length; i++) {

            this.boxes[i].textContent = "";
            this.boxesArray = ["","","","","","","","",""];

        }
        this.turnCount = 0 ; 
        document.getElementById("tic-board").style.pointerEvents = "auto";
        document.getElementById("when-someone-wins").style.display = "none"; 
        document.getElementById("tic-board").style.opacity = 1;

    },
    setBoard:function(){
        for (let i = 0; i < this.boxes.length; i++) {
            this.boxes[i].addEventListener("click", (event) =>{

                let clickedBox = event.target;
              
                if (this.isItPlayerOneTurn === true && (clickedBox.textContent !== "O" && clickedBox.textContent !== "X")){
                    clickedBox.textContent = "X";
                    this.isItPlayerOneTurn = false; 
                    document.getElementById("player-turn").textContent = this.playerTwo.name + "'s turn";
                    this.turnCount ++; 
                    this.boxesArray[i] = "X";
                }else if (this.isItPlayerOneTurn === false && (clickedBox.textContent !== "O" && clickedBox.textContent !== "X")){
                    clickedBox.textContent = "O";
                    this.isItPlayerOneTurn = true; 
                    document.getElementById("player-turn").textContent = this.playerOne.name + "'s turn";
                    this.turnCount++;
                    this.boxesArray[i] = "O";

                }

                if (this.turnCount >= 5){
                    const someoneOne = this.checkForWin();
                    if (someoneOne){

                    }
                }
             
            });
        }
    },
    checkForWin:function(){
        
        console.log("TURN "+this.turnCount);
        for (let i = 0 ; i < this.possibleWinsList.length ; i++){
            const firstRowOfAnswers = this.possibleWinsList[i];
            let threeToWin = 0 ; 
            let baseElement = this.boxesArray[firstRowOfAnswers[0]];
            for (let x = 0 ; x < firstRowOfAnswers.length ; x++){

                let nextIndex = firstRowOfAnswers[x];
                let nextBoxElement = this.boxesArray[nextIndex];
                if (baseElement === nextBoxElement && (baseElement !== "" && nextBoxElement !== "")){
        
                    threeToWin++;
                    if (threeToWin === 3){
                        console.log("YOU WON");
                        let playerWhoWon = this.isItPlayerOneTurn ? this.playerTwo.name : this.playerOne.name;

                        for(let winIndex = 0 ; winIndex < 3 ; winIndex++){
      
                            this.boxes[firstRowOfAnswers[winIndex]].textContent = playerWhoWon;
                        }
                        if (this.isItPlayerOneTurn){
                            this.playerTwo.giveWins();
                            console.log("Player two wins " + this.playerTwo.getWins);
                            document.getElementById("player-two-score").textContent = "Score: " + this.playerTwo.getWins();
                        }else{
                            this.playerOne.giveWins();
                            console.log("Player one wins " + this.playerOne.getWins);

                            document.getElementById("player-one-score").textContent = "Score: " + this.playerOne.getWins();

                        }
                        document.getElementById("tic-board").style.opacity = 0.5
                        document.getElementById("tic-board").style.pointerEvents = "none";
                        document.getElementById("when-someone-wins").textContent = playerWhoWon + " WINS \nPlease reset to play again.";
                        document.getElementById("when-someone-wins").style.display = "block"; 

                        return true;
                    }
                }
        
            }

      
        }
        console.log("No winner");
        return false; 

        
       
    }


};
function createPlayer(name){


    let wins = 0 ; 
    const getWins = () => wins; 
    const giveWins = () => wins++; 

    return {name,wins,getWins,giveWins};

}

// function startGame(newPlayerOne, newPlayerTwo){

//     let playerOne = createPlayer(newPlayerOne);
//     let playerTwo = createPlayer(newPlayerTwo);

 

//     return {playerOne, playerTwo};
// }

document.getElementById("start-button").addEventListener("click",function(){
    
    let playerOneElement = document.getElementById("user-input-player-one");
    let playerTwoElement = document.getElementById("user-input-player-two");
    
    let playerOneName = playerOneElement.value;
    let playerTwoName = playerTwoElement.value;
    if (playerOneName.length === 0){playerOneName = "Player One"};
    if (playerTwoName.length === 0){playerTwoName = "Player Two"};

    game.startGame(playerOneName,playerTwoName);
    game.setBoard();
    document.getElementById("start-screen-box").style.display = "none";
    document.getElementById("start-game").style.display = "block";
    document.getElementsByClassName("player-one-name").item
});

document.getElementById("reset-button").addEventListener("click",function(){
    game.resetBoard();

});





