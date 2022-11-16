const Username = document.querySelector('#username')
const SaveScoreBtn = document.querySelector('#SaveScoreBtn')
const FinalScore = document.querySelector('#FinalScore')
const MostRecentScore = localStorage.getItem('mostRecentScore')

const HighScores = JSON.parse(localStorage.getItem('HighScores')) || []

const MAX_HIGH_SCORES = 5

FinalScore.innerText = MostRecentScore

Username.addEventListener('keyup', () => {
    SaveScoreBtn.disabled = !Username.value
})

SaveHighScore = e => {
    e.preventDefault()

    const Score = {
        Score: MostRecentScore,
        Name: Username.value
    }

    HighScores.push(Score)

    HighScores.sort((a, b) => {
        return b.Score - a.Score
    })

    HighScores.splice(5)

    localStorage.setItem("HighScores", JSON.stringify(HighScores))
    window.location.assign('https://devsentinel.github.io/QuizApp/')
}