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

    const checkWin = (board, player) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every((cell) => cell !== "");
    };

    const emptyCells = (board) => {
        return board.map((cell, index) => (cell === "") ? index : -1).filter(index => index !== -1);
    };

    const minimax = (newBoard, player) => {
        const availableSpots = emptyCells(newBoard);

        if (checkWin(newBoard, "O")) {
            return { score: 10 };
        } else if (checkWin(newBoard, "X")) {
            return { score: -10 };
        } else if (availableSpots.length === 0) {
            return { score: 0 };
        }

        const moves = [];

        for (let i = 0; i < availableSpots.length; i++) {
            const move = {};
            move.index = availableSpots[i];
            newBoard[availableSpots[i]] = player;

            if (player === "O") {
                const result = minimax(newBoard, "X");
                move.score = result.score;
            } else {
                const result = minimax(newBoard, "O");
                move.score = result.score;
            }

            newBoard[availableSpots[i]] = "";

            moves.push(move);
        }

        let bestMove;
        if (player === "O") {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    };

    const computerMove = () => {
        if (gameActive) {
            const bestMove = minimax([...board], "O");
            const computerCellIndex = bestMove.index;

            if (computerCellIndex !== undefined) {
                setTimeout(() => {
                    cells[computerCellIndex].click();
                }, 1000);
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameActive && !board[index]) {
                cell.innerText = currentPlayer;
                cell.style.backgroundColor = "#eee";
                board[index] = currentPlayer;

                if (checkWin(board, currentPlayer)) {
                    gameActive = false;
                    message.innerText = `${currentPlayer} wins!`;

                    if (currentPlayer === "X") {
                        playerScore++;
                        playerScoreElement.innerText = playerScore;
                    } else {
                        computerScore++;
                        computerScoreElement.innerText = computerScore;
                    }
                } else if (checkDraw()) {
                    gameActive = false;
                    message.innerText = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    if (currentPlayer === "O" && gameActive) {
                        computerMove();
                    }
                }
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
