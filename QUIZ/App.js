var Question = function (text, choises, answer) {
  this.text = text;
  this.choises = choises;
  this.answer = answer;
};
//Question prototype
Question.prototype.checkanswer = function (answer) {
  return this.answer === answer;
};

//Quiz Constructor
function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}
//Quiz prototype
Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};
//Quiz isFinish
Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};
//Quiz guess
Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();

  if (question.checkanswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var q1 = new Question(
  "What is the best programming language?",
  ["C#", "Javascript", "Asp.Net", "Phython"],
  "Javascript"
);

var q2 = new Question(
  "What is the most popular programming language?",
  ["C#", "Javascript", "NodeJs", "Visual Basic"],
  "Javascript"
);

var q3 = new Question(
  "What is the best modern programming language",
  ["C#", "Javascript", "Asp.Net", "Phython"],
  "Javascript"
);

var questions = [q1, q2, q3];

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var soru = quiz.getQuestion();
    var choises = soru.choises;
    console.log(choises);
    document.querySelector("#question").textContent = soru.text;

    for (let i = 0; i < choises.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choises[i];
      guess("btn" + i, choises[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestion();
  };
}
function showScore() {
  var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
  document.querySelector(".card-body").innerHTML = html;
}
function showProgress() {
  var totalNumber = quiz.questions.length;
  var questionNumber = quiz.questionIndex + 1;
  document.querySelector(
    ".card-footer"
  ).innerHTML = `Question ${questionNumber} of ${totalNumber}`;
}
