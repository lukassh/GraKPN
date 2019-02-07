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
var player = { score: 0, round: 0, choice: ''  };
var computer = { score: 0, round: 0, choice: ''};
var rounds = { akt: 1, max: 0};


// computer  move
var compMove = function(){
  var choise = ['Papier', 'Kamień', 'Nożyczki'];
  return choise[Math.floor(Math.random() *3)];
 };

// check winner
var checkWinner = function(){
   if(player.choise === computer.choise) { output.innerHTML = ('<strong>Remis!</strong>, You played ' +player.choise + ' and Computer played: ' +computer.choise); }
  else if((player.choise === 'Kamień' && computer.choise === 'Nożyczki') || (player.choise === 'Papier' && computer.choise === 'Kamień') || (player.choise === 'Nożyczki' &&  computer.choise === 'Papier')
  ){ 
    output.innerHTML = ('You <strong>Won!</strong> You played: ' +player.choise + ' and Computer played: ' +computer.choise);
    player.score++; 
   }
  else {
    output.innerHTML = ('You <strong>Lose</strong>! You played: ' +player.choise + ' and Computer played: ' +computer.choise);
    computer.score++;
  };
};

//adding text 
var writeScore = function() {
   results.innerHTML = ('Wynik rundy: ' +player.score + ' : ' +computer.score);
};

//check score - rounds
var checkScore = function() {
  if(player.score === 10) {
    player.round++;
    rounds.akt++;
    player.score = 0; 
    computer.score = 0;
    output.innerHTML = ('Gratualcje wygrałeś rundę Runda: ');
  }  
  else if(computer.score === 10){ 
    computer.round++; 
    rounds.akt++;
    player.score = 0; 
    computer.score = 0;
    output.innerHTML = ('Nietstye przegrałeś rundę Runda: ');
  }; 
  rounds.innerHTML = ('Wynik meczu: ' +player.round + ' : ' +computer.round);
};

// check match winner 
var checkMatchWinner = function() {
  if(player.round > computer.round) {
     matchResult.innerHTML = ('Gratulacje Wygrałeś !');
    }
  else if(player.round === computer.round ) {
    matchResult.innerHTML = ('Remis !');
    }
  else if(player.round < computer.round) { 
  matchResult.innerHTML = ('Niestety przegrałeś !');
  };
};
var disableBtn = function() {
  var buttons = document.getElementsByTagName('button');
  for(i=0; i<5; i++) {  buttons[i].classList.toggle('dis'); };
};
//start
newGame.addEventListener('click', function() {
  
  rounds.max = window.prompt('Ile rund gramy?: ');
  infoRound.innerHTML = ('gramy ' +rounds.max + ' rundy.');
      uPapier.addEventListener("click", function(){ playerMove('Papier'); });
      uKamien.addEventListener('click', function(){ playerMove('Kamień'); });
      uNozyczki.addEventListener('click', function(){ playerMove('Nożyczki'); });
      var compMove = function(){
        var choise = ['Papier', 'Kamień', 'Nożyczki'];
          return choise[Math.floor(Math.random() *3)];
        }; 
        var playerMove = function(choise) {
            player.choise = choise;
            computer.choise = compMove();
            checkWinner();
            writeScore();
            checkScore(); 
          infoRound.innerHTML = ('gramy ' +rounds.max + ' rundy. Runda: ' + rounds.akt + ' / ' +rounds.max);
          if (rounds.akt > rounds.max) { 
            checkMatchWinner(); 
            disableBtn();
          };  
        };
 });


var guziki = document.querySelectorAll('player-move');
for ( var i = 0; i < guziki.length; i++ ){
  attr = this.getAttribute('data-move');
  playerMove(attr);
}

