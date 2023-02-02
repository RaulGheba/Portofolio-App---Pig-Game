'use strict';

// Selecting elements
var player0El = $('.player--0');
var player1El = $('.player--1');

var score0El = $('#score--0'); // STARTING scores
var score1El = $('#score--1'); // STARTING scores
var current0El = $('#current--0'); // the current score for p1
var current1El = $('#current--1'); // the current score for p2
var btnNew = $('.btn--new');
var btnRoll = $('.btn--roll');
var btnHold = $('.btn--hold');
var diceEl = $('.dice');
var btnNew = $('.btn--new');
var playing = true;
var switchPlayer = function () {
  //switch to next player
  currentScore = 0;
  $('#current--0').text(currentScore);
  $('#current--1').text(currentScore);

  activePlayer = activePlayer === 0 ? 1 : 0; // with the ternary operator,
  // we say "if the active player is 0, then the new active player is 1.  else, its zero"
  $(player0El).toggleClass('player--active');
  $(player1El).toggleClass('player--active');
};
//////////////////////////////////////////////////////////////////////

score0El = 0; // set both scores to 0, and the dice is hidden
score1El = 0;

$('#score--0').text(score0El);
$('#score--1').text(score1El);
$('.dice').addClass('hidden');

var scores = [0, 0]; // scores for both sides
var currentScore = 0; //DECLARATION of currentScore
var activePlayer = 0; //since we start with first player, it is set to "0"
/////////////////////////////////////////////////////////////////////////

// Rolling dice

$(btnRoll).on('click', function () {
  if (playing) {
    console.log('total player 1 score: ' + $('#score--0').text());
    console.log('total player 2 score: ' + $('#score--1').text());
    console.log('current player 1 score: ' + $('#current--0').text());
    console.log('current player 2 score: ' + $('#current--1').text());
    // 1. Generate a random dice roll
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice according to value
    $('.dice').removeClass('hidden');
    $(diceEl).attr('src', `dice-${dice}.png`);

    // 3. Check for a rolled 1. if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice;
      $(`#current--${activePlayer}`).text(currentScore);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

$(btnHold).on('click', function () {
  if (playing) {
    console.log('total player 1 score: ' + $('#score--0').text());
    console.log('total player 2 score: ' + $('#score--1').text());
    console.log('current player 1 score: ' + $('#current--0').text());
    console.log('current player 2 score: ' + $('#current--1').text());

    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    // ^ scores[1] = scores[1] + currentScore ^
    $(`#score--${activePlayer}`).text(scores[activePlayer]);

    // 2. check if player's score is >=100
    // finish game

    if (scores[activePlayer] >= 15) {
      playing = false;
      $(`.player--${activePlayer}`).addClass('player--winner');
    } else {
      switchPlayer();
    }
  }
});

$(btnNew).on('click', function () {
  //if game is reset with "new game"
  scores[0] = 0;
  scores[1] = 0;
  //player 1 is reseted
  $('#score--0').val(scores[0]);
  $('#score--0').text(scores[0]);
  $('#current--0').val(scores[0]);
  $('#current--0').text(scores[0]);

  //player 2 is reseted

  $('#score--1').val(0);
  $('#score--1').text(0);
  $('#current--1').val(0);
  $('#current--1').text(0);
  if (activePlayer == 1) {
    switchPlayer();
    $('.player--1').removeClass('player--winner');
  } else {
    $('.player--0').removeClass('player--winner');
  }
  currentScore = 0;
  playing = true;
});
