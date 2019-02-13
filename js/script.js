 // zmienne buttons
var uPapier = document.getElementById('btnPapier');
var uKamien = document.getElementById('btnKamien');
var uNozyczki = document.getElementById('btnNozyczki');
var newGame = document.getElementById('newGame');
// zmienne tekst
var output = document.getElementById('output');
var results = document.getElementById('results');
var rounds = document.getElementById('rounds');
var infoRound = document.getElementById('infoRound');
var matchResult = document.getElementById('matchResult');
//zmienne globalne


var params = {
  playerScore: 0,
  playerRound: 0,
  playerChoise: '';
  computerScore: 0,
  computerRound: 0,
  computerChoise: '';
  roundsWon: 0,
  roundsLost: 0,
  roundsAkt: 1;
  roundsMax: 0;
  gameDone: false;
}


// computer  move
var compMove = function(){
  var choise = ['Papier', 'Kamień', 'Nożyczki'];
  return choise[Math.floor(Math.random() *3)];
 };

// check winner
var checkWinner = function(){
   if(params.playerChoise === paramscomputerChoise) { output.innerHTML = ('<strong>Remis!</strong>, You played ' +params.playerChoise + ' and Computer played: ' +params.computerChoise); }
  else if((params.playerChoise === 'Kamień' && params.computerChoise === 'Nożyczki') || (params.playerChoise === 'Papier' && params.computerChoise === 'Kamień') || (params.playerChoise === 'Nożyczki' &&  params.computerChoise === 'Papier')
  ){ 
    output.innerHTML = ('You <strong>Won!</strong> You played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
    params.playerScore++; 
   }
  else {
    output.innerHTML = ('You <strong>Lose</strong>! You played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
    params.computerScore++;
  };
};

//adding text 
var writeScore = function() {
   results.innerHTML = ('Wynik rundy: ' +params.playerScore + ' : ' +params.computerScore);
};

//check score - rounds
var checkScore = function() {
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
  rounds.innerHTML = ('Wynik meczu: ' +params.playerRound + ' : ' params.computerRound);
};

// check match winner 
var checkMatchWinner = function() {
  if(params.playerRound >params.computerRound) {
     matchResult.innerHTML = ('Gratulacje Wygrałeś !');
    }
  else if(params.playerRound ===params.computerRound ) {
    matchResult.innerHTML = ('Remis !');
    }
  else if(params.playerRound <params.computerRound) { 
  matchResult.innerHTML = ('Niestety przegrałeś !');
  };
};
var disableBtn = function() {
  var buttons = document.getElementsByTagName('button');
  for(i=0; i<5; i++) {  buttons[i].classList.toggle('dis'); };
};
//start
newGame.addEventListener('click', function() {
  
  params.roundsMax = window.prompt('Ile rund gramy?: ');

  infoRound.innerHTML = ('gramy ' +params.roundsMax + ' rundy.');
      uPapier.addEventListener("click", function(){ playerMove('Papier'); });
      uKamien.addEventListener('click', function(){ playerMove('Kamień'); });
      uNozyczki.addEventListener('click', function(){ playerMove('Nożyczki'); });
      var compMove = function(){
        var choise = ['Papier', 'Kamień', 'Nożyczki'];
          return choise[Math.floor(Math.random() *3)];
        }; 
        var guziki = document.querySelectorAll('.player-move');
          for ( var i=0; i<guziki.length; i++ ){
            attr = this.getAttribute('.data-move');
            playerMove(choise);
          }
        var playerMove = function(choise) {
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
 });


  // Modale 
  
  var showModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.add('show');
  };
  
  
  var modalLinks = document.querySelectorAll('.show-modal');
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', showModal);
  }


  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  // Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }
  // Koniec modali 