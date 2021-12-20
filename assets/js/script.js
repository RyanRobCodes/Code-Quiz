function takeQuiz(questionBank) {
    this.score = 0;
    this.questionBank = questionBank;
    this.questionIndex = 0;
    begin.style.display = "none";
    displayQuestion();
    quizContainer.style.display ="block";
    displayProgress();
    displayCounter();
    timer = setInterval(displayCounter,1000);
}

takeQuiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

takeQuiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}

takeQuiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

var questionBank = [
    question("Commonly used data types DO Not Include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
    question("A very useful tool used during development and debugging for printing content to the debugger is:", 
    ["JavaScript", "terminal/bash", "for loops", "console.log"], "console.log"),
    question("Arrays in JavaScript can be used to store:", ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "all of the above")
];

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var quiz = new Quiz(questions);
 
// display quiz
populate();