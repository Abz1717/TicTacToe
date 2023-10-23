document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.querySelector("[data-message]");
    const restartButton = document.querySelector("[data-restart]");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

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
                message.innerText = `${currentPlayer} wins!`;
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
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        message.innerText = "";
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.style.backgroundColor = "#eee";
            cell.style.color = "#000";
        });
    });
});
