const QUESTIONS = [
    {
        question: 'What parts does the UK consist of?',
        answers: [ 'England, Scotland, Wales, Northern Ireland', 'England, Scotland, Wales', 'England, Wales, Northern Ireland' ]
    },
    {
        question: 'What river is the British capital situated on?',
        answers: [ 'on the Thames', 'on the Severn', 'on the Mississippi' ]
    },
    {
        question: 'What is the capital of Scotland?',
        answers: [ 'Edinburgh', 'Belfast', 'Cardiff' ]
    },
    {
        question: 'What is the capital of Northern Ireland?',
        answers: [ 'Belfast', 'Edinburgh', 'Cardiff' ]
    },
    {
        question: 'What is the London home of the Queen?',
        answers: [ 'Buckingham Palace', 'Westminster Palace', 'The Houses of Parliament' ]
    },
    {
        question: 'What birds live in the Tower of London?',
        answers: [ 'Ravens', 'Sparrows', 'Woodpeckers' ]
    },
    {
        question: 'What is in the centre of Trafalgar Square?',
        answers: [ 'Nelson’s Column', 'the Monument to Queen', 'the Monument to Peter Pan' ]
    },
    {
        question: 'What city are the Beatles from?',
        answers: [ 'Liverpool', 'Manchester', 'London' ]
    },
    {
        question: 'What famous Scottish hero did Mel Gibson play in the film ‘Braveheart’?',
        answers: [ 'William Wallace', 'Winston Churchill', 'Charles Darwin' ]
    },
    {
        question: 'What is the most typical English dish?',
        answers: [ 'fish and chips', 'burgers', 'pancakes' ]
    },
    {
        question: 'What is the name of the highest observation wheel in London?',
        answers: [ 'London Eye', 'London Ear', 'London Head' ]
    },
    {
        question: 'When did the famous Great Fire of London happen?',
        answers: [ '1666', '1656', '1965' ]
    },
    {
        question: 'What is the name of the British Flag?',
        answers: [ 'Union Jack', 'Uncle Sam', 'Elton John' ]
    },
    {
        question: 'Who lived in Sherwood Forest?',
        answers: [ 'Robin Hood', 'William Shakespeare', 'David Beckham' ]
    },
    {
        question: 'Who was called “An Iron Lady”?',
        answers: [ 'Margaret Thatcher', 'Elizabeth I', 'Jane Austen' ]
    },
    {
        question: 'Where is the Loch Ness Monster from?',
        answers: [ 'Scotland', 'Wales', 'England' ]
    },
    {
        question: 'What is the most important airport in Great Britain?',
        answers: [ 'Heathrow Airport', 'Stansted Airport', 'Gatwick Airport' ]
    },
]

function renderAnswer(answer) {
    return `<p class="quiz-entry__answer">
        <span class="quiz-entry__answer-button">${answer}</span>
    </p>`;
}

function renderQuestion({ question, answers }) {
    const randomAnswers = [].concat(answers)
        .sort(() => Math.random() - 0.5)
    return `
      <div class="quiz-entry quiz-entry_transition_in">
        <p class="quiz-entry__question">${question}</p>
        ${randomAnswers.map(renderAnswer).join('')}
      </div>`;
}

function createRoot() {
    const root = document.createElement('div');
    document.querySelector('body').appendChild(root);
    root.setAttribute('id', 'root');

    const poweredBy = document.createElement('div');
    document.querySelector('body').appendChild(poweredBy);
    poweredBy.classList.add('powered-by');

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

function unmountHero() {
    return new Promise(resolve => {
        const hero = document.querySelector('.hero');

        hero.classList.add('hero_transition_out');
        setTimeout(() => {
            hero.parentNode.removeChild(hero);
            resolve();
        }, 1000);
    })
}

function mountIntro() {
    mountHero('Godel UK Quiz');
    document.querySelector('.hero').setAttribute('id', 'intro');
}

function mountHero(content) {
    document.getElementById('root').innerHTML = `<div class="hero hero_transition_in">${content}</div>`;
    setTimeout(() => document.querySelector('.hero').classList.remove('hero_transition_in'));
}

function mountSuccess() {
    mountHero('Congratulations! You have passed the quiz successfully and may proceed to the Godel Team to get a lottery number!');
    setTimeout(() => unmountHero().then(mountIntro), 20000);
}

function mountFailure() {
    mountHero('Sorry. You have tried.');
    setTimeout(() => unmountHero().then(mountIntro), 5000);
}

const onClick = async (evt) => {
  console.log('insidwe');

  if (evt.target.getAttribute('id') === 'intro') {
    questionIdx = 0;
    mountQuestion(questionIdx);
    return;
  }

  if (evt.target.getAttribute('class') === 'quiz-entry__answer-button') {
    await unmountQuestion();

    if (evt.target.innerText === QUESTIONS[questionIdx].answers[0]) {
      console.log('correct');
      questionIdx += 1;
      if (questionIdx === QUESTIONS.length) {
        mountSuccess();
      } else {
        mountQuestion(questionIdx);
      }
    } else {
      mountFailure()
    }

    return;
  }

}
document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot();

  mountIntro();

    let questionIdx;
    document.querySelector('body').addEventListener('touchend', onClick);
});
