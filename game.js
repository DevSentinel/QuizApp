const Question = document.querySelector('#question');
const Choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#ProgressText');
const ScoreText = document.querySelector('#score');
const ProgressBarFull = document.querySelector('#ProgressBarFull');

let CurrentQuestion = {}
let AcceptingAnswers = true
let Score = 0
let QuestionCounter = 0
let AvailableQuestions = []

let Questions = [
    {
        question: 'What is evaporation mostly caused from?',
        choice1: 'Animals',
        choice2: 'The Clouds',
        choice3: 'Land',
        choice4: 'Bodies of Water',
        answer: 4,
    },
    {
        question: 'What does liquid turn into once it is evaporated?',
        choice1: 'Gas',
        choice2: 'Water Vapor',
        choice3: 'Air',
        choice4: 'Both Choice 1 & 2',
        answer: 4,
    },
    {
        question: 'Evapiration occurs when water changes into _______',
        choice1: 'Transpiration',
        choice2: 'Solid',
        choice3: 'Vapor',
        choice4: 'Snow',
        answer: 3,
    },
    {
        question: 'The change of state from a liquid to a gas',
        choice1: 'Water Cycle',
        choice2: 'Evaporation',
        choice3: 'Precipitation',
        choice4: 'Condensation',
        answer: 2,
    },
    {
        question: 'The change of state from a gas to liquid',
        choice1: 'Water Cycle',
        choice2: 'Evaporation',
        choice3: 'Precipitation',
        choice4: 'Condensation',
        answer: 4,
    },
    {
        question: 'Which is the opposite of condensation?',
        choice1: 'Runoff',
        choice2: 'Evaporation',
        choice3: 'Precipitation',
        choice4: 'Transpiration',
        answer: 2,
    },
    {
        question: 'A _______ is/are an example(s) of matter.',
        choice1: 'Shoe',
        choice2: 'Pencil',
        choice3: 'Computer',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'When the temperature of matter increases the particles...',
        choice1: 'Speed up and move closer',
        choice2: 'Speed up and move farther apart',
        choice3: 'Slow down and move closer together',
        choice4: 'Slow down and move farther apart',
        answer: 2,
    },
    {
        question: 'Air is a mixture of',
        choice1: 'Liquids',
        choice2: 'Gas',
        choice3: 'Solids',
        choice4: 'Liquids & Gases',
        answer: 2,
    },
    {
        question: 'What process is occurring for the glue to harden eventually?',
        choice1: 'Filtration',
        choice2: 'Distillation',
        choice3: 'Evaporation',
        choice4: 'Chromatography',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

StartGame = () => {
    QuestionCounter = 0
    Score = 0
    AvailableQuestions = [...Questions]
    GetNewQuestion()
}

GetNewQuestion = () => {
    if(AvailableQuestions.length === 0 || QuestionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', Score)

        return window.location.assign('https://devsentinel.github.io/QuizApp/end.html')
    }

    QuestionCounter++
    ProgressText.innerText = `Question ${QuestionCounter} of ${MAX_QUESTIONS}`
    ProgressBarFull.style.width = `${(QuestionCounter/MAX_QUESTIONS) * 100}%`

    const QuestionsIndex = Math.floor(Math.random() * AvailableQuestions.length)
    CurrentQuestion = AvailableQuestions[QuestionsIndex]
    Question.innerText = CurrentQuestion.question

    Choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = CurrentQuestion['choice' + number]
    })

    AvailableQuestions.splice(QuestionsIndex, 1)

    AcceptingAnswers = true
}

Choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!AcceptingAnswers) return

        AcceptingAnswers = false
        const SelectedChoice = e.target
        const SelectedAnswer = SelectedChoice.dataset['number']

        let ClassToApply = SelectedAnswer == CurrentQuestion.answer ? 'correct' : 'incorrect'

        if(ClassToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        SelectedChoice.parentElement.classList.add(ClassToApply)
        
        setTimeout(() => {
            SelectedChoice.parentElement.classList.remove(ClassToApply)
            GetNewQuestion()
        }, 500)

    })
})

incrementScore = num => {
    Score +=num
    ScoreText.innerText = Score
}

StartGame()