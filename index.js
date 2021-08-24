const color = document.querySelectorAll('.color');
const setttingColor = localStorage.getItem('color');
const ratingsBlock = document.querySelector('.ratings');
const deleteScoreButton = document.querySelectorAll('.delete-score');
document.body.style.setProperty('--bc-color', setttingColor);

const openModal = (e) => {
    const clickElement = e.target.closest('[data-modal]');
    let modal;
    if (clickElement) {
        const target = clickElement.dataset.modal;
        modal = document.querySelector(`.modal[data-modal="${target}"]`);
        modal.classList.add('active');
    }
    if (e.target.closest('.close')) {
        modal.classList.remove('active');
    }
}

const setColor = () => {
    color.forEach(item => {
        item.style.backgroundColor = item.dataset.color;
    });
}

const changeColor = () => {
    color.forEach(item => {
        item.addEventListener('click', () => {
            let color = item.dataset.color;
            document.body.style.setProperty('--bc-color', color);
            localStorage.setItem('color', color);
        });
    });
}

const createScore = (scores) => {
    ratingsBlock.textContent = '';

    scores.forEach((item, i) => {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
                <div class="user__name">${item.nick}</div>
                <div class="user__score">Очки: ${item.score}</div>
                <button class="delete-score" data-id=${i}><i class="fas fa-trash-alt"></i></button>
        `;

        ratingsBlock.appendChild(div);
    });
}

const getUserScores = () => {
    if (localStorage.getItem('player')) {
        const player = JSON.parse(localStorage.getItem('player'));
        createScore(player);
    }
}

const deleteScore = () => {
    document.addEventListener('click', (e) => {
        let deleteBtn = e.target.closest('.delete-score');
        if (deleteBtn) {
            let player = JSON.parse(localStorage.getItem('player'));
            let score = deleteBtn.parentElement;
            player = player.filter((_, i) => i !== +deleteBtn.dataset.id);
            score.classList.add('fall');
            localStorage.setItem('player', JSON.stringify(player));
            score.addEventListener('transitionend', getUserScores);
        }
    });
}



document.addEventListener('click', openModal);
setColor();
changeColor();
getUserScores();
deleteScore();