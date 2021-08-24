const quizData = [{
        question: 'Столица Турции?',
        answers: [{
                id: 1,
                text: 'Стамбул'
            },
            {
                id: 2,
                text: 'Анкара'
            },
            {
                id: 3,
                text: 'Анталия'
            },
            {
                id: 4,
                text: 'Измир'
            }
        ],
        answer: 2
    },
    {
        question: 'Первый президент СССР?',
        answers: [{
                id: 1,
                text: 'Сталин'
            },
            {
                id: 2,
                text: 'Ленин'
            },
            {
                id: 3,
                text: 'Горбачев'
            },
            {
                id: 4,
                text: 'Брежнев'
            }
        ],
        answer: 3
    },
    {
        question: 'Сколько будет 2 + 2 * 2 * 2 + 2?',
        answers: [{
                id: 1,
                text: '18'
            },
            {
                id: 2,
                text: '12'
            },
            {
                id: 3,
                text: '10'
            },
            {
                id: 4,
                text: '16'
            }
        ],
        answer: 2
    },
    {
        question: 'Самая большая страна Европы по площади?',
        answers: [{
                id: 1,
                text: 'Германия'
            },
            {
                id: 2,
                text: 'Франция'
            },
            {
                id: 3,
                text: 'Россия'
            },
            {
                id: 4,
                text: 'Испания'
            }
        ],
        answer: 3
    }
];


const questionNum = document.querySelector('#question_num');
const scores = document.querySelector('#scores');
const questionContent = document.querySelector('.quiz__content');
const question = document.querySelector('.question');
const choices = document.querySelectorAll('.quiz__choice');
const progress = document.querySelector('.progress-bar__full');
const setttingColor = localStorage.getItem('color');
document.body.style.setProperty('--bc-color', setttingColor);

let currentQuestion = {};
let availeableQuestion = [];
let score = 0;
let countQuestion = 0;
let isAnswer = true;
const prefix = ['A', 'B', 'C', 'D'];

const SCORE_POINTS = 100;
const MAX_QUES = quizData.length;



const getNewQuestion = () => {

    if (availeableQuestion.length === 0 || countQuestion > MAX_QUES) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../end');
    }

    questionContent.innerHTML = '';
    countQuestion++;
    questionNum.textContent = `Вопрос ${countQuestion} из ${MAX_QUES}`;
    progress.style.width = `${(countQuestion / MAX_QUES) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availeableQuestion.length);
    currentQuestion = availeableQuestion[questionIndex];
    question.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((item, i) => {
        const div = document.createElement('div');
        div.classList.add('quiz__choice');
        div.setAttribute('data-number', i + 1);
        div.innerHTML = `
            <p class="quiz__choice__prefix">${prefix[i]}.</p>
            <p class="quiz__choice__text">${item.text}</p>
        `;
        questionContent.appendChild(div);
    });

    availeableQuestion.splice(questionIndex, 1);

    isAnswer = true;

}

const incrementScore = (num) => {
    score += num;
    console.log(score);
    scores.textContent = score;
}

const selectAnswer = (e) => {
    if (e.target.closest('.quiz__choice')) {
        if (!isAnswer) return;
        isAnswer = false;
        let selectedAnswer = e.target.closest('.quiz__choice');
        let addClass = +selectedAnswer.dataset.number === currentQuestion.answer ? 'correct' : 'incorrect';
        if (addClass === 'correct') {
            incrementScore(SCORE_POINTS);
        }
        console.log(addClass)
        selectedAnswer.classList.add(addClass);
        setTimeout(() => {
            selectedAnswer.classList.remove(addClass);
            getNewQuestion();
        }, 1000);
    }
}

const startGame = () => {
    countQuestion = 0;
    score = 0;
    availeableQuestion = [...quizData];
    getNewQuestion();
}

startGame();
questionContent.addEventListener('click', selectAnswer);