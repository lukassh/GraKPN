
var newGame = document.getElementById('newGame');
// zmienne tekst
var output = document.getElementById('output');
var results = document.getElementById('results');
var rounds = document.getElementById('rounds');
var infoRound = document.getElementById('infoRound');
var matchResult = document.getElementById('matchResult');
let modalPoints = document.getElementById('tablePoints');
let modalRounds = document.getElementById('tableRounds');
let outputRounds = document.getElementById('roundsStatus');
//zmienne globalne

var params = {
  playerScore: 0,
  playerRound: 0,
  playerChoise: '',
  playerName: '',
  computerScore: 0,
  computerRound: 0,
  computerChoise: '',
  roundsAkt: 1,
  roundsMax: 1,
  roundStat: '',
}
                                                // Funkcje **********************************
    // computer  move
    function compMove(){
      var choise = ['Papier', 'Kamień', 'Nożyczki'];
      return choise[Math.floor(Math.random() *3)];
     };

    // check winner
    function checkWinner(){
       if(params.playerChoise === params.computerChoise) { output.innerHTML = ('<strong>Remis!</strong><br>, You played ' +params.playerChoise + ' and Computer played: ' +params.computerChoise); }
      else if((params.playerChoise === 'Kamień' && params.computerChoise === 'Nożyczki') || (params.playerChoise === 'Papier' && params.computerChoise === 'Kamień') || (params.playerChoise === 'Nożyczki' &&  params.computerChoise === 'Papier')
      ){ 
        output.innerHTML = ('You <strong>Won!</strong><br> You played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
        params.playerScore++; 
       }
      else {
        output.innerHTML = ('You <strong>Lose</strong>!<br> You played: ' +params.playerChoise + ' and Computer played: ' +params.computerChoise);
        params.computerScore++;
      };
    };

    //adding text 
    function writeScore() {
       results.innerHTML = ('Wynik rundy: ' +params.playerScore + ' : ' +params.computerScore);
       modalPoints.innerHTML = (params.roundsMax);
       writeTableRounds();
    };

    //check score - rounds
    function checkScore() {
      if(params.playerScore === 3) {
        params.playerRound++;
        params.roundsAkt++;
        params.playerScore = 0; 
        params.computerScore = 0;
        output.innerHTML = ('Gratualcje wygrałeś rundę Runda: ');
      }  
      else if(params.computerScore === 3){ 
        params.computerRound++; 
        params.roundsAkt++;
        params.playerScore = 0; 
        params.computerScore = 0;
        output.innerHTML = ('Nietstye przegrałeś rundę Runda: ');     
      }; 
      rounds.innerHTML = ('Wynik meczu: ' +params.playerRound + ' : ' +params.computerRound);
      modalRounds.innerHTML = (params.playerRound + ' : ' +params.computerRound);
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
      for(i=0; i<5; i++) {  buttons[i].classList.add('dis'); };
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
    function writeTableRounds(){
        outputRounds.innerHTML = '';
        for (var i = 0; i < params.roundsMax; i++) {
        outputRounds.insertAdjacentHTML('beforeend', '<tr><td>Runda '+ (i+1) + ': </td><td>' +params.playerScore + ' : ' +params.computerScore + '</td></tr>'); 
      }
    }  
                                                    // START *********************************** 
//start 
newGame.addEventListener('click', function() {
  
  var buttonMoves = document.querySelectorAll('.player-move');   
  params.roundsMax = window.prompt('Ile rund gramy?: ');
    if (isNaN(params.roundsMax))  { 
      alert('Type number')
    } else {
         infoRound.innerHTML = ('gramy ' +params.roundsMax + ' rundy.'); 
    }
  
  for (var i=0; i < buttonMoves.length; i ++ ) {
     
     buttonMoves[i].addEventListener('click', function() {
       var moveName = this.getAttribute('data-move');
       playerMove(moveName);
     });
  } 
   compMove();  
});

// modale                                                     MODALE ***********************************
  
  function openModal(mod) {
    document.getElementById('overlay').classList.add('show');
    document.getElementById(mod).classList.add('show');
    disableBtn();
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



