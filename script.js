let map = document.querySelector('.map');

for (let i = 1; i < 301; i++) {
    let square = document.createElement('div');
    square.classList.add('square')
    map.appendChild(square)
}

let squares = document.querySelectorAll('.square');


let x = 1;
let y = 15;

for (let i = 0; i < squares.length; i++) {
    if (x > 20) {
        y--
        x = 1
    }
    squares[i].setAttribute('posX', x)
    squares[i].setAttribute('posY', y)
    x++
}


let drawSnake = () => {
    let posX = Math.floor(Math.random() * 15 + 5);
    let posY = Math.floor(Math.random() * 10 + 5);
    console.log(posX, posY)
    return [posX, posY]
}

let res = drawSnake();
let snakeHead = document.querySelector(`[posX="${res[0]}"][posY="${res[1]}"]`);
let snakeBody = document.querySelector(`[posX="${res[0] - 1}"][posY="${res[1]}"]`);
let snakeTail = document.querySelector(`[posX="${res[0] - 2}"][posY="${res[1]}"]`);
let snakePos = [snakeTail, snakeBody, snakeHead];

const drawApple = () => {
    let posX = Math.floor(Math.random() * 19 + 1);
    let posY = Math.floor(Math.random() * 14 + 1);
    let apple = document.querySelector(`[posX="${posX}"][posY="${posY}"]`);
    if (!apple.classList.contains('head') || !apple.classList.contains('body')) {
        apple.classList.add('apple')
    }
};
drawApple();

let direction = 'x';
let score = 0;






const snakeMove = (e) => {
    switch (e.keyCode) {
        case 38:
            direction = 'y';
            break

        case 39:
            direction = 'x';
            break
        case 37:
            direction = '-x';
            break;
        case 40:
            direction = '-y';
            break;
    }
}



const nextMoveFilter = (nextMove, direction, headX, headY) => {

    switch (direction) {
        case 'x': {
            nextMove = document.querySelector(`[posX="${+headX + 1}"][posY="${headY}"]`);
            if (nextMove !== null && nextMove.classList.contains('body') === true) {
                nextMove = document.querySelector(`[posX="${+headX - 1}"][posY="${headY}"]`);
                direction = '-x'
            }
            break;
        }
        case 'y': {
            nextMove = document.querySelector(`[posX="${headX}"][posY="${+headY + 1}"]`);
            if (nextMove !== null && nextMove.classList.contains('body') === true) {
                nextMove = document.querySelector(`[posX="${+headX}"][posY="${+headY - 1}"]`);
                direction = '-y'
            }
            break;
        }
        case '-x': {
            nextMove = document.querySelector(`[posX="${+headX - 1}"][posY="${headY}"]`)
            if (nextMove !== null && nextMove.classList.contains('body') === true) {
                nextMove = document.querySelector(`[posX="${+headX + 1}"][posY="${headY}"]`);
                direction = 'x'
            }
            break;
        }
        case '-y': {
            nextMove = document.querySelector(`[posX="${headX}"][posY="${+headY - 1}"]`);
            if (nextMove !== null && nextMove.classList.contains('body')) {
                nextMove = document.querySelector(`[posX="${+headX}"][posY="${+headY + 1}"]`);
                direction = 'y'
            }
            break;
        }


        default:
            break;
    }

    if (nextMove === null && direction === 'x') {
        return nextMove = document.querySelector(`[posX="${1}"][posY="${headY}"]`);
    }
    else if (nextMove === null && direction === 'y') {
        return nextMove = document.querySelector(`[posX="${headX}"][posY="${1}"]`);
    }
    else if (nextMove === null && direction === '-y') {
        return nextMove = document.querySelector(`[posX="${headX}"][posY="${15}"]`);
    }
    else if (nextMove === null && direction === '-x') {
        return nextMove = document.querySelector(`[posX="${20}"][posY="${headY}"]`);
    }

    if (nextMove.classList.contains('apple')) {
        nextMove.classList.remove('apple');
        drawApple();
        score++;
        document.querySelector('.score').innerText = score;
        let newTail = document.querySelector(`[posX="${+snakePos[0].getAttribute('posX')}"][posY="${+snakePos[0].getAttribute('posY')}"]`)
        snakePos.unshift(newTail);
        console.log(snakePos.length);
    }

    return nextMove
}




const snakeInterval = () => {
    snakePos.forEach(el => el.classList.add('body'))
    snakePos.forEach(el => el.classList.remove('head'))
    let headX = snakePos[snakePos.length - 1].getAttribute('posX');
    let headY = snakePos[snakePos.length - 1].getAttribute('posY');

    let nextMove
    nextMove = nextMoveFilter(nextMove, direction, headX, headY)
    nextMove.classList.add('head');
    snakePos.push(nextMove);
    endGame();

    snakePos.shift().classList.remove('head', 'body');
}

const endGame = () => {
    if (snakePos[snakePos.length - 1].classList.contains('body')) {
        location.reload()
        setTimeout(() => {
            alert(`Game over.\nYour score: ${score}`);
            score = 0;

        })

    }
}

let interval = setInterval(snakeInterval, 100);

document.addEventListener('keydown', snakeMove)