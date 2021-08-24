const finalScore = document.querySelector('.final-score');
const form = document.querySelector('.player');
const accept = document.querySelector('#accept');
const setttingColor = localStorage.getItem('color');
document.body.style.setProperty('--bc-color', setttingColor);

const getStorage = () => {
    let score = localStorage.getItem('mostRecentScore');
    finalScore.textContent = score;
    if (localStorage.getItem('player')) {
        let player = JSON.parse(localStorage.getItem('player'));
        if (player.length > 0) form.nick.value = player[player.length - 1].nick || '';
    }
}

const saveScore = (e) => {
    e.preventDefault();
    const nick = form.nick;
    let player_info;
    let score = localStorage.getItem('mostRecentScore');
    if (nick.value) {
        if (localStorage.getItem('player') === null) {
            player_info = [];
        } else {
            player_info = JSON.parse(localStorage.getItem('player'));

        }
        player_info.push({ nick: nick.value, score })
        localStorage.setItem('player', JSON.stringify(player_info));
    }
    window.location.assign('../');
}

getStorage();
form.addEventListener('submit', saveScore);
accept.addEventListener('click', saveScore);