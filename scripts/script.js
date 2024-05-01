



function createPlayer(name){


    let wins = 0 ; 
    const getWins = () => wins; 
    const giveWins = () => wins++; 

    return {name,wins,getWins,giveWins};

}

function startGame(newPlayerOne, newPlayerTwo){

    let playerOne = createPlayer(newPlayerOne);
    let playerTwo = createPlayer(newPlayerTwo);

 

    return {playerOne, playerTwo};
}

document.getElementById("start-button").addEventListener("click",function(){
    
    let playerOneElement = document.getElementById("user-input-player-one");
    let playerTwoElement = document.getElementById("user-input-player-two");
    
    let playerOneName = playerOneElement.value;
    let playerTwoName = playerTwoElement.value;


    startGame(playerOneName,playerTwoName);

    document.getElementById("start-screen-box").style.display = "none";
    document.getElementById("start-game").style.display = "block";


});