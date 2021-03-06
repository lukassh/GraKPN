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
       if(params.playerChoise === params.computerChoise) { output.innerHTML = ('<strong>Remis!</strong>, You played ' +params.playerChoise + ' and Computer played: ' +params.computerChoise); }
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

        matchResult.innerHTML = ('Gratulacje Wygrałeś !');

        }
      else if(params.playerRound === params.computerRound ) {

        matchResult.innerHTML = ('Remis !');
        }
      else if(params.playerRound < params.computerRound) { 

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
                                                           // START *********************************** 
//start 
newGame.addEventListener('click', function() {
  uPapier.addEventListener("click", function(){ playerMove('Papier'); });
  uKamien.addEventListener('click', function(){ playerMove('Kamień'); });
  uNozyczki.addEventListener('click', function(){ playerMove('Nożyczki'); });
  
  params.roundsMax = window.prompt('Ile rund gramy?: ');
  infoRound.innerHTML = ('gramy ' +params.roundsMax + ' rundy.');
  
  var plMoves = document.querySelectorAll('.player-move');
 /* for ( var i = 0; i < plMoves.length; i++) {
    this.addEventListener('click', function() {
      var attr = this.getAttribute('data-move');
      playerMove(attr);
  });
  } */

function moves() {
  for (var i = 0; i < plMoves.length; i++){
    var choise = plMoves[i].getAttribute('data-move');
    this.addEventListener('click', function() {
      playerMove(choise);
    }); 
  }
}
    
  // playerMove(choise);
  compMove();  
});



// modale                                                     MODALE ***********************************
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




