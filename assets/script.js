// declare variables and get elements
var main = document.getElementsByTagName('main')[0];
var viewHighscoreLink = document.getElementById('view-highscore');
var timeDisplay = document.getElementById('display-time');
var startQuizButton = document.getElementById('start-btn');
var questionNumbersBox = document.getElementById('numbers-box');
var questionDisplay = document.getElementById('question-display');
var answersList = document.getElementById('answer-list');
var answerFeedback = document.getElementById('feedback');
var scoreDisplay = document.getElementById('score-display');
var initialsInput = document.getElementById('initials-input');
var submitInitials = document.getElementById('submit-initials-btn');
var highscoreList = document.getElementById('highscore-list');
var startingPage = document.getElementById('back-button');
var clearHighscores = document.getElementById('clear-hs-btn');

// Questions Array using question, answer array and correct key for answer
var questions = [
    {
        'question': 'Debugging tool used during development for printing content to display is?',
        'answers': ['for loops', 'console.log', 'terminal / bash', 'JavaScript'],
        'correct': 1
    }, {
        'question': 'Commonly used data types DO NOT include:',
        'answers': ['alerts', 'numbers', 'strings', 'booleans'],
        'correct': 0
    }, {
        'question': 'The condition in an if/else statement is enclosed within ______.',
        'answers': ['quotes', 'curly brackets', 'square brackets', 'parentheses'],
        'correct': 3
    }, {
        'question': 'Which program is used by web clients to view the web pages?',
        'answers': ['Web browser', 'Protocol', 'Web server', 'Search Engine'],
        'correct': 0
    }, {
        'question': 'The ______ attribute is used to identify the values of variables.',
        'answers': ['text', 'http-equiv', 'content', 'name'],
        'correct': 2
    }, {
        'question': 'This is a declaration that is an instruction to the web browser about what version of HTML is used.',
        'answers': ['html', 'doctype', 'head', 'body'],
        'correct': 1
    }, {
        'question': 'Content between these opening and closing ______ tags will show up in a browser view.',
        'answers': ['body', 'meta', 'head', 'html'],
        'correct': 0
    }, {
        'question': 'This is a language used for parsing localStorage elements.',
        'answers': ['HTML', 'CSS', 'JSON', 'XML'],
        'correct': 3
    }, {
        'question': 'There are ______ characters in the hexidecimal color code for shades of red, green, and blue.',
        'answers': ['4', '5', '6', '7'],
        'correct': 2
    }, {
        'question': 'Which term describes the skeletal layout of a Web page? ',
        'answers': ['A wireframe', 'Mind map', 'Template', 'Goals'],
        'correct': 0
    }
]

// score tracking variables
var startTime = questions.length * 8;
var timePenalty = 10;
var remainingTime;
var timer;
var score;

//Start Quiz and event listeners
function quizStart() {
    startQuizButton.addEventListener('click', event => {
        event.preventDefault();
        displayQuestionPage();
    })
    answersList.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.matches('button')) {
            var button = event.target;
            if (button.classList.contains('correct')) {
                answerFeedback.textContent = "Correct!";
                questionNumbersBox.children[nextQuestionIndex - 1].classList.add('correct');
                score++;
            } else {
                answerFeedback.textContent = "Wrong!";
                questionNumbersBox.children[nextQuestionIndex - 1].classList.add('wrong');
                remainingTime -= timePenalty;
            }
            if (remainingTime > 0) displayNextQuestion();
            else displayGetNamePage();
        }
    })
    //Collect Highscore initials and put in storage
    submitInitials.addEventListener('click', event => {
        event.preventDefault()
        var initials = initialsInput.value.toUpperCase();
        if (initials) {
            var highscores = JSON.parse(localStorage.getItem('highscores')) || []
            timestamp = Date.now();
            highscores.push({
                'timestamp': timestamp,
                'score': score,
                'initials': initials,
                'timeRemaining': remainingTime
            })
            highscores = highscores.sort((a, b) => {
                if (a.score != b.score) return b.score - a.score;
                if (a.timeRemaining != b.timeRemaining) return b.timeRemaining - a.timeRemaining;
                if (a.timestamp != b.timestamp) return a.timestamp - b.timestamp;
                return 0;
            })
            localStorage.setItem('highscores', JSON.stringify(highscores));
            displayHighscorePage();
            initialsInput.value = "";
        }
    })
    // Start page reset listener
    startingPage.addEventListener('click', event => {
        event.preventDefault();
        displayStartingPage();
    })
    // Clear High scores and local storage
    clearHighscores.addEventListener('click', event => {
        var confirmed = confirm("Are you sure you want to clear all High scores?");
        if (confirmed) {
            event.preventDefault();
            localStorage.setItem('highscores', "[]");
            displayHighscorePage();
        }
    })
    // View high scores
    viewHighscoreLink.addEventListener('click', event => {
        event.preventDefault();
        displayHighscorePage();
    })
    displayStartingPage();
}

// Display or hide each page for quiz
var id = 0;
function displayPage(id) {
    main.querySelectorAll('.page').forEach(page => {
        if (page.id === id) {
            page.classList.remove('hide');
        } else {
            page.classList.add('hide');
        }
    })
    return 4;
}

function displayStartingPage() {
    displayPage('start-quiz');
    clearInterval(timer);
    remainingTime = 0;
    timeDisplay.textContent = formatSeconds(remainingTime);
}

// Delcare variables to randomize questions for next display
var nextQuestionIndex;
var randomQuestions;

// Display questions and create number box display
function displayQuestionPage() {
    displayPage('question-page');
    questionNumbersBox.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        const element = questions[i];
        var el = document.createElement('span');
        el.textContent = i + 1;
        questionNumbersBox.appendChild(el);
    }
    randomizedQuestions = randomizeArray(questions)
    nextQuestionIndex = 0;
    score = 0;
    startTimer();
    displayNextQuestion();
}

// Display random questions
function displayNextQuestion() {
    if (nextQuestionIndex < questions.length) {
        var question = randomizedQuestions[nextQuestionIndex].question;
        var answers = randomizedQuestions[nextQuestionIndex].answers;
        var randomizedAnswers = randomizeArray(answers);
        var correctAnswer = answers[randomizedQuestions[nextQuestionIndex].correct];
        // display questions
        questionDisplay.textContent = question;
        answersList.innerHTML = "";
        answerFeedback.textContent = "";
        // Iterate through to create random answers
        for (let i = 0; i < randomizedAnswers.length; i++) {
            var answer = randomizedAnswers[i];
            var button = document.createElement("button");
            button.classList.add('answer');
            if (answer === correctAnswer) {
                button.classList.add('correct');
            }
            button.textContent = (i + 1) + "." + answer;
            answersList.appendChild(button);
        }
        nextQuestionIndex++;
    } else {
        clearInterval(timer);
        displayGetNamePage();
    }
}

// End of quiz initials, score and remaining time
function displayGetNamePage() {
    displayPage('get-name');
    if (remainingTime < 0)
        remainingTime = 0;
    timeDisplay.textContent = formatSeconds(remainingTime);
    scoreDisplay.textContent = score;
}

// Display for High Scores
function displayHighscorePage() {
    displayPage('high-score');
    questionNumbersBox.innerHTML = "";
    highscoreList.innerHTML = "";
    clearInterval(timer);
    let highscores = JSON.parse(localStorage.getItem('highscores'));
    let i = 0;
    for (var key in highscores) {
        i++;
        var highscore = highscores[key];
        var el = document.createElement('div');
        var initials = highscore.initials.padEnd(3, ' ');
        var playerScore = highscore.score.toString().padStart(3, ' ');
        var timeRemaining = formatSeconds(highscore.timeRemaining);
        el.textContent = (i) + ". " + initials + "- Score:" + playerScore + " - Time:" + timeRemaining;
        highscoreList.appendChild(el);
    }
}
// Shuffle questions and answers to random display
function randomizeArray(questions) {
    // recreate array questions, answers and answer key
    shuffle = [...questions];
    output = [];
    while (shuffle.length > 0) {
        var r = Math.floor(Math.random() * shuffle.length);
        var i = shuffle.splice(r, 1)[0];
        output.push(i);
    }
    return output;
}

// Start timer display 0 if time is up
function startTimer() {
    remainingTime = startTime;
    timeDisplay.textContent = formatSeconds(remainingTime);
    timer = setInterval(function () {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timer);
            displayGetNamePage();
        } else {
            timeDisplay.textContent = formatSeconds(remainingTime);
        }
    }, 1000);
}

// Time display in mm:ss using padStart and toString
function formatSeconds(seconds) {
    let m = Math.floor(seconds / 60).toString().padStart(2, ' ');
    let s = (seconds % 60).toString().padStart(2, '0');
    return m + ":" + s;
}
// Start Quiz
quizStart();