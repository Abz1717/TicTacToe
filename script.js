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
    let winningPlayer = null;

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
                winningPlayer = currentPlayer;
                if (winningPlayer === "X") {
                    playerScore++;
                    playerScoreElement.innerText = playerScore;
                } else {
                    computerScore++;
                    computerScoreElement.innerText = computerScore;
                }
                message.innerText = `${winningPlayer} wins!`;
                return;
            }
        }

        if (board.includes("") === false) {
            gameActive = false;
            message.innerText = "It's a draw!";
        }
    };

    const highlightWinningCombination = (combination) => {
        for (const index of combination) {
            cells[index].style.backgroundColor = "#4CAF50";
            cells[index].style.color = "#fff";
        }
    };

    const computerMove = () => {
        if (gameActive) {
            const availableCells = board
                .map((cell, index) => (cell === "" ? index : null))
                .filter((cell) => cell !== null);

            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const computerCellIndex = availableCells[randomIndex];

            if (computerCellIndex !== undefined) {
                setTimeout(() => {
                    cells[computerCellIndex].click();
                }, 1000); // Delay the computer move for added realism
            }
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
                if (currentPlayer === "O" && gameActive) {
                    computerMove();
                }
            }
        });
    });

    restartButton.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        message.innerText = "";
        winningPlayer = null;
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.style.backgroundColor = "#eee";
            cell.style.color = "#000";
        });
    });

    resetScoreButton.addEventListener("click", () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.innerText = "0";
        computerScoreElement.innerText = "0";
    });
});
