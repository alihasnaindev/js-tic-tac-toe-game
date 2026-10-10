
const boxes = document.querySelectorAll(".btn");
const resetBtn = document.querySelector("#resetBtn");
const newGameBtn = document.querySelector("#newGameBtn");
const msgContainer = document.querySelector(".msgContainer");
const msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBtns();
    msgContainer.classList.add("hide");
};

boxes.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            btn.innerText = "O";
            turnO = false;
        } else {
            btn.innerText = "X";
            turnO = true;
        }

        btn.disabled = true;
        checkWinner();
    });
});

const disableBtns = () => {
    for (let btn of boxes) {
        btn.disabled = true;
    }
};

const enableBtns = () => {
    for (let btn of boxes) {
        btn.disabled = false;
        btn.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;
    disableBtns();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val);
            return;
        }
    }

    let isDraw = [...boxes].every((btn) => btn.innerText !== "");

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        gameOver = true;
        disableBtns();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);