'use strict';

// Selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dicel = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// dicel.classList.add('hidden');
let scores, current_score, active_player, playing;

const init = function () {
    scores = [0, 0];
    current_score = 0;
    active_player = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    dicel.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${active_player}`).textContent = 0;
    current_score = 0;
    active_player = active_player === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice
        dicel.classList.remove('hidden');
        dicel.src = `dice-${dice}.png`;
        console.log(dice)

        //3. Check for rolled 1
        if (dice !== 1) {
            //Add dice to the current score
            current_score += dice;
            document.getElementById(`current--${active_player}`).textContent = current_score;
        }
        else {// Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to active player's score
        scores[active_player] += current_score;
        //scores[1] = scores[1]+current_socre

        document.getElementById(`score--${active_player}`).textContent = scores[active_player];
        console.log(scores[active_player]);

        //2. Check if player's score is >=100
        if (scores[active_player] >= 100) {
            // Finish the game 
            playing = false;
            dicel.classList.add('hidden');
            document.querySelector(`.player--${active_player}`).classList.add('player--winner');
            document.querySelector(`.player--${active_player}`).classList.remove('player--active');
        }
        else {
            // Switch to another player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);