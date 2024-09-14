const game_info = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const new_game_btn = document.querySelector('.btn');

const cheat_boxes = document.querySelectorAll('.cheat-box');

let currentPlayer; // shows current player turn
let checked_boxes; // to store the checked boxes positions
let checked_cnt; // to count the checked boxes

let cheat_checked_boxes; // 🤫🤫
// cheat win position 1st is for cheat checked box and rest 2 positions for normal checked boxes
const cheatWinPositions = [
    [0, 0, 1],
    [1, 3, 4],
    [2, 6, 7],
    [0, 3, 7],
    [2, 3, 1]
]

const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


boxes.forEach((box, idx) => {
    // console.log(box, idx);
    box.addEventListener('click', () => checkBox(box, idx));
});

function checkBox(box, idx) {
    if(checked_boxes[idx] == '') {
        box.textContent = currentPlayer;
        checked_boxes[idx] = currentPlayer;
        checked_cnt++;
        box.style.pointerEvents = 'none';

        changePlayer();
        checkGameStatus();
    }
}

function changePlayer() {
    if(currentPlayer == 'X')    currentPlayer = 'O';
        else    currentPlayer = 'X';
        game_info.textContent = `Player ${currentPlayer} Turn`;
}

cheat_boxes.forEach((cheatBox, idx) => cheatBox.addEventListener('click', () => checkCheatBox(cheatBox, idx)));

function checkCheatBox(cheatBox, idx) {
    if(cheat_checked_boxes[idx] == '') {
        cheat_checked_boxes[idx] = currentPlayer;
        cheatBox.classList.add('active');
        cheatBox.textContent = currentPlayer;
        changePlayer();
        checkCheatGameStatus();
    }
}

function checkGameStatus() {
    winPositions.forEach((posi) => {
        if((checked_boxes[posi[0]] != '' && checked_boxes[posi[1]] != '' && checked_boxes[posi[2]] != '') && (checked_boxes[posi[0]] === checked_boxes[posi[1]] && checked_boxes[posi[1]] === checked_boxes[posi[2]]))
            gameOver(checked_boxes[posi[0]], posi, false);
    });

    if(checked_cnt == 9)    gameOver('Tied');
};

function checkCheatGameStatus() {
    cheatWinPositions.forEach((posi) => {
        if((cheat_checked_boxes[posi[0]] != '' && checked_boxes[posi[1]] != '' && checked_boxes[posi[1]] != '') && (cheat_checked_boxes[posi[0]] === checked_boxes[posi[1]] && checked_boxes[posi[1]] === checked_boxes[posi[2]])) {
            // console.log('won by cheating🤣');  
            gameOver(cheat_checked_boxes[posi[0]], posi, true);
        }
    });
}

function gameOver(status, winBoxes, cheat) {
    // console.log(status);
    if(cheat == true) {
        game_info.textContent = `Player ${status} won 🤣`;
        cheat_boxes[winBoxes[0]].classList.add('win');
        boxes[winBoxes[1]].classList.add('win');
        boxes[winBoxes[2]].classList.add('win');
    }
    else {
        if(status == 'Tied')    game_info.textContent = 'Game Tied';
        else {
            game_info.textContent = `Player ${status} won`;
            winBoxes.forEach((idx) => boxes[idx].classList.add('win'));
        }    
    }

    new_game_btn.classList.add('active');
    boxes.forEach((box) => box.style.pointerEvents = 'none');
    cheat_boxes.forEach((cheatBox) => cheatBox.style.pointerEvents = 'none');
}

new_game_btn.addEventListener('click', startGame);

function startGame() {
    currentPlayer = 'X';
    game_info.textContent = `Player ${currentPlayer} Turn`;
    checked_boxes = ['', '', '', '', '', '', '', '', ''];

    boxes.forEach((box) => {
        box.textContent = '';
        box.style.pointerEvents = 'all';
        box.classList.remove('win');
    });

    cheat_checked_boxes = ['', '', ''];
    cheat_boxes.forEach((cheatBox) => {
        cheatBox.textContent = '';
        cheatBox.classList.remove('win');
        cheatBox.classList.remove('active');
        cheatBox.style.pointerEvents = 'all';
    });

    checked_cnt = 0;
    new_game_btn.classList.remove('active');
}

startGame();