document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8; // Grid 8x8
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];
    let squares = [];
    let score = 0;

    // Membuat papan permainan
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            const randomColor = Math.floor(Math.random() * colors.length);
            square.style.backgroundColor = colors[randomColor];
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);
        }

        // Pasang event listener setelah papan dibuat
        squares.forEach((square) => square.addEventListener('dragstart', dragStart));
        squares.forEach((square) => square.addEventListener('dragend', dragEnd));
        squares.forEach((square) => square.addEventListener('dragover', dragOver));
        squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
        squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
        squares.forEach((square) => square.addEventListener('drop', dragDrop));
    }

    // Drag and Drop Events
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {}

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragEnd() {
        // Validasi apakah perpindahan itu sah
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged + 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + width,
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }

        checkMatches();
    }

    // Mengecek apakah ada 3 warna yang cocok
    function checkMatches() {
        // Mengecek baris horizontal
        for (let i = 0; i < 64; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = decidedColor === '';

            if (
                rowOfThree.every(
                    (index) =>
                        squares[index] &&
                        squares[index].style.backgroundColor === decidedColor && !isBlank
                )
            ) {
                score += 3;
                scoreDisplay.innerText = score;
                rowOfThree.forEach((index) => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }

        // Mengecek kolom vertikal
        for (let i = 0; i < 48; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = decidedColor === '';

            if (
                columnOfThree.every(
                    (index) =>
                        squares[index] &&
                        squares[index].style.backgroundColor === decidedColor && !isBlank
                )
            ) {
                score += 3;
                scoreDisplay.innerText = score;
                columnOfThree.forEach((index) => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }
    }

    createBoard();
});
