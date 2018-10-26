const QUESTIONS = [
    {
        question: 'O RLY?',
        answers: [ 'YA RLY!', 'SRSLY?', 'Y U NO LIEK ME?!', 'LOL WUT' ]
    },
    {
        question: 'KOKOKO?',
        answers: [ '111!', '2222?', '3333?!', '4444' ]
    },
]

function renderAnswer(answer) {
    return `<p class="quiz-entry__answer">
        <span class="quiz-entry__answer-button">${answer}</span>
    </p>`;
}

function renderQuestion({ question, answers }) {
    return `
      <div class="quiz-entry quiz-entry_transition_in">
        <p class="quiz-entry__question">${question}</p>
        ${answers.map(renderAnswer).join('')}
      </div>`;
}

function createRoot() {
    const root = document.createElement('div');
    document.querySelector('body').appendChild(root);
    root.setAttribute('id', 'root');
    return root;
}

function mountQuestion(idx) {
    document.getElementById('root').innerHTML = renderQuestion(QUESTIONS[idx]);
    setTimeout(() => {
        document.querySelector('.quiz-entry').classList.remove('quiz-entry_transition_in');
    })
}

function unmountQuestion() {
    return new Promise((resolve, reject) => {
        const question = document.querySelector('.quiz-entry');
        question.classList.add('quiz-entry_transition_out');
        setTimeout(() => {
            question.parentNode.removeChild(question);
            resolve(0);
        }, 1000);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot();

    let questionIdx = 0;
    mountQuestion(questionIdx);

    document.querySelector('body').addEventListener('click', async (evt) => {
        if (evt.target.getAttribute('class') !== 'quiz-entry__answer-button') {
            return;
        }

        await unmountQuestion();
        questionIdx += 1;
        questionIdx = questionIdx % QUESTIONS.length;
        mountQuestion(questionIdx);
    });
});
