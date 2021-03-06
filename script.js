`use strict`;
var newGame = document.getElementById('newGame');
// zmienne tekst
var output = document.getElementById('output');
var results = document.getElementById('results');
var rounds = document.getElementById('rounds');
var infoRound = document.getElementById('infoRound');
var matchResult = document.getElementById('matchResult');
let playerName = document.getElementById('playerName');
let playerNameOutput = document.getElementById('player-name');
//zmienne globalne

var params = {
  playerScore: 0,
  playerRound: 0,
  playerChoise: '',
  computerScore: 0,
  computerRound: 0,
  computerChoise: '',
  roundsAkt: 1,
  roundsMax: 1,
}
                                                // Funkcje **********************************
    // computer  move
    function compMove(){
      var choise = ['Papier', 'Kamień', 'Nożyczki'];
      return choise[Math.floor(Math.random() *3)];
     };

    // check winner
    function checkWinner(){
       if(params.playerChoise === params.computerChoise) { output.innerHTML = ('<strong>Remis!</strong><br>, ' + playerName +' played ' +params.playerChoise + ' and Computer played: ' +params.computerChoise); }
      else if((params.playerChoise === 'Kamień' && params.computerChoise === 'Nożyczki') || (params.playerChoise === 'Papier' && params.computerChoise === 'Kamień') || (params.playerChoise === 'Nożyczki' &&  params.computerChoise === 'Papier')
      ){ 
        output.innerHTML = ('You <strong>Won!</strong><br> ' + playerName +' played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
        params.playerScore++; 
       }
      else {
        output.innerHTML = ('You <strong>Lose</strong>!<br> ' + playerName +' played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
        params.computerScore++;
      };
    };

    //adding text 
    function writeScore() {
       results.innerHTML = ('Wynik rundy: ' +params.playerScore + ' : ' +params.computerScore);
    };

    //check score - rounds
    function checkScore() {
      if(params.playerScore === 10) {
        params.playerRound++;
        params.roundsAkt++;
        params.playerScore = 0; 
        params.computerScore = 0;
        output.innerHTML = ('Gratualcje wygrałeś rundę Runda: ');
      }  
      else if(params.computerScore === 10){ 
        params.computerRound++; 
        params.roundsAkt++;
        params.playerScore = 0; 
        params.computerScore = 0;
        output.innerHTML = ('Nietstye przegrałeś rundę Runda: ');
      }; 
      rounds.innerHTML = ('Wynik meczu: ' +params.playerRound + ' : ' +params.computerRound);
    };

    // check match winner 
    function checkMatchWinner() {

      if(params.playerRound > params.computerRound) {

        openModal(modalResults);
        matchResult.innerHTML = ('Gratulacje Wygrałeś !');

        }
      else if(params.playerRound === params.computerRound ) {
        openModal(modalResults);
        matchResult.innerHTML = ('Remis !');
        }
      else if(params.playerRound < params.computerRound) { 
        openModal(modalResults);
        matchResult.innerHTML = ('Niestety przegrałeś !');
      };
    };
    function disableBtn() {
      var buttons = document.getElementsByTagName('button');
      for(i=0; i<5; i++) {  buttons[i].classList.toggle('dis'); };
    };

    function playerMove(choise) {
                params.playerChoise = choise;
                params.computerChoise = compMove();
                checkWinner();
                writeScore();
                checkScore(); 
              infoRound.innerHTML = ('gramy ' +params.roundsMax + ' rundy. Runda: ' + params.roundsAkt + ' / ' +params.roundsMax);
              if (params.roundsAkt > params.roundsMax) { 
                checkMatchWinner(); 
                disableBtn();
              };  
            };

    function compMove(){
            var choise = ['Papier', 'Kamień', 'Nożyczki'];
              return choise[Math.floor(Math.random() *3)];
            }; 

     function startGame() {
        document.getElementById('overlay').classList.add('show');
        document.getElementById('modalNewGame').classList.add('show');
        var roundsToPlay = document.getElementById('howManyRounds');
        var params.roundsMax = roundsToPlay.value;

        playerNameOutput.innerHTML = playerName;
        infoRound.innerHTML = ('gramy ' +params.roundsMax + ' rundy.');
      
       var buttonMoves = document.querySelectorAll('.player-move');   
        
        for (var i=0; i < buttonMoves.length; i ++ ) {
           
           buttonMoves[i].addEventListener('click', function() {
            var moveName = this.getAttribute('data-move');
            playerMove(moveName);
           });
        } 
 
        compMove(); 

    }; 
                                                           // START *********************************** 
//start 
newGame.addEventListener('click', function(event) {
    openModal();
   
});



// modale                                                     MODALE ***********************************
  
  function openModal() {
    document.getElementById('overlay').classList.add('show');
    document.getElementById('modalResults').classList.add('show');
  };   
  function closeModal() {
    document.getElementById('overlay').classList.remove('show')
  };
  document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault()
      closeModal()
    })
  });
  document.querySelector('#overlay').addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal()
    }
  });
  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {
      closeModal()
    }
  });




