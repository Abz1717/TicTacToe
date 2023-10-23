document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.querySelector("[data-message]");
    const restartButton = document.querySelector("[data-restart]");
    const playerScoreElement = document.querySelector("[data-player-score]");
    const computerScoreElement = document.querySelector("[data-computer-score]");
    const resetScoreButton = document.querySelector("[data-reset-score]");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let playerScore = 0;
    let computerScore = 0;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                highlightWinningCombination(combination);
                updateScore(currentPlayer);
                message.innerText = `${currentPlayer} wins!`;
                return;
            }
        }

        if (!board.includes("") && gameActive) {
            gameActive = false;
            message.innerText = "It's a draw!";
        }
    };

    const highlightWinningCombination = (combination) => {
        for (const index of combination) {
            cells[index].classList.add("winning-cell");
        }
    };

    const updateScore = (player) => {
        if (player === "X") {
            playerScore++;
            playerScoreElement.innerText = playerScore;
        } else {
            computerScore++;
            computerScoreElement.innerText = computerScore;
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameActive && !board[index]) {
                cell.innerText = currentPlayer;
                cell.style.backgroundColor = "#eee";
                board[index] = currentPlayer;
                checkWin();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
    });

    restartButton.addEventListener("click", () => {
        resetGame();
    });

    resetScoreButton.addEventListener("click", () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.innerText = "0";
        computerScoreElement.innerText = "0";
        resetGame();
    });

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        message.innerText = "";
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.style.backgroundColor = "#eee";
            cell.classList.remove("winning-cell");
        });
    };
});
