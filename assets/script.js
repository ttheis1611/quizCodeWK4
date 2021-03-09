var startBtn = document.getElementById("enterBtn");
var displayTime = document.getElementById("display-time");
var questionDisplay = document.getElementById('question-display')
var answersList = document.getElementById('answer-list')
var answerFeedback = document.getElementById('feedback')
var initTime;
var timeComplete;
// var questionSection = document.querySelector('question-section');

// Start Quiz and HIDE text
var startQuiz = function(event) {
    // Clear screen for questions
    document.getElementById("p1").style.display = "none";
    document.getElementById("p2").style.display = "none";
    document.getElementById("enterBtn").style.display = "none";
    // Start questions
    startClock();
    // questionPage();
};

// Questions array sets
var questArr = [
    //q: question, a: answers, i: correct answer
    {
        q: 'Commonly used data types DO NOT Include:',
        a: ['strings', 'booleans', 'alerts', 'numbers'],
        i: 2
    }, {
        q: 'String values must be enclosed within ______ when being assigned to variables.',
        a: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        i: 2
    }
];

//  var questionPage = function () {
//     var score = 0
//     for(var i = 0; i < questArr.length; i++) {
//      var userQuestion = textContent(questArr[i].q);
//      questionDisplay.textContent = userQuestion;

//     for(var i = 0; i < userAnswer.length; i++) {
//         var userAnswer = textContent(questArr[i].a);
//         var ansBtn = document.createElement("ansBtn")
//         ansBtn.textContent = `${i + 1}. ${userAnswer}`;
//         answersList.appendChild(ansBtn);


//     }

//     if(userAnswer === questArr[i].a) {
//         window.alert("You are the bestest!")
//         score++;
//     } else {

//         window.alert("Missed that one!")
//         score--;
//     }
// }
// };

// Function to format min:sec
function formatSeconds(seconds) {
    var m = Math.floor(seconds / 60).toString().padStart(2, ' ');
    var s = (seconds % 60).toString().padStart(2, '0');
    return ` ${m}:${s}`;
}

// Start Clock countdown
function startClock() {
    var timeLeft = 120;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            displayTime.textContent = formatSeconds(timeLeft);
            timeLeft--;
        } else {
            displayTime.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
};


// }
// THEN I can save my initials and score



// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// Start Button click listener
startBtn.addEventListener("click", startQuiz);