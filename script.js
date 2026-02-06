// 7 Bible Questions
const questions = [
  {
    question:
      "What was the first miracle performed by Jesus according to the Gospel of John?",
    options: [
      "A. Feeding the 5,000",
      "B. Healing a blind man",
      "C. Turning water into wine",
      "D. Walking on water",
    ],
    answer: "C. Turning water into wine",
  },
  {
    question:
      "Which author is attributed to writing most of the New Testament?",
    options: ["A. Matthew", "B. Luke", "C. Paul", "D. Abraham"],
    answer: "C. Paul",
  },
  {
    question:
      "Who betrayed Jesus to the religious leaders for 30 pieces of silver?",
    options: ["A. Peter", "B. Judas Iscariot", "C. Thomas", "D. Andrew"],
    answer: "B. Judas Iscariot",
  },
  {
    question:
      "What was the name of the tax collector who climbed the tree to see Jesus in Jericho?",
    options: ["A. Matthew", "B. Zacchaeus", "C. Levi", "D. Nicodemus"],
    answer: "B. Zacchaeus",
  },
  {
    question: "On which island was the book of Revelation written?",
    options: ["A. Patmos", "B. Cyprus", "C. Crete", "D. Malta"],
    answer: "A. Patmos",
  },
  {
    question:
      "In Paul's letter to the Ephesians, what are believers encouraged to put on to stand against the devil's schemes?",
    options: [
      "A. The Gospel of Peace",
      "B. The Helmet of Salvation",
      "C. The Shield of Faith",
      "D. The Armor of God",
    ],
    answer: "D. The Armor of God",
  },
  {
    question: "What does the Greek word Euangelion/Evangelion mean?",
    options: [
      "A. Ancient prophecy",
      "B. Divine punishment",
      "C. Good news/message",
      "D. Holy scripture",
    ],
    answer: "C. Good news/message",
  },
];

// DOM Elements
const startBtn = document.querySelector(".start-btn");
const home = document.querySelector(".home");
const quizSection = document.querySelector(".quiz-section");
let questionText = document.querySelector(".question-text");
let optionsList = document.querySelectorAll(".option");
let nextBtn = document.querySelector(".next-btn");
let questionCount = document.querySelector(".question-count");
let scoreText = document.querySelector(".score");

let currentQuestion = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
  home.classList.remove("active");
  quizSection.classList.add("active");
  showQuestion();
});

// Show Question
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionsList.forEach((option, index) => {
    option.querySelector("span").textContent = q.options[index];
    option.onclick = () => checkAnswer(q.options[index]);
  });
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Check Answer
function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
    scoreText.textContent = `Score: ${score}`;
  }
  // Disable clicking after selecting
  optionsList.forEach((option) => (option.onclick = null));
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // Show final score with Play Again button
    quizSection.innerHTML = `
      <div class="quiz-box">
        <h1>Quiz Completed!</h1>
        <p>Your Score: ${score} / ${questions.length}</p>
        <button class="play-again-btn">Play Again</button>
      </div>
    `;

    // Add event listener for Play Again
    const playAgainBtn = document.querySelector(".play-again-btn");
    playAgainBtn.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      quizSection.innerHTML = `
        <div class="quiz-box">
          <h2 class="question-text">Question will appear here</h2>
          <div class="options-list">
            <div class="option"><span>A. Option 1</span></div>
            <div class="option"><span>B. Option 2</span></div>
            <div class="option"><span>C. Option 3</span></div>
            <div class="option"><span>D. Option 4</span></div>
          </div>
          <div class="quiz-footer">
            <span class="question-count">Question 1 of ${questions.length}</span>
            <span class="score">Score: 0</span>
            <button class="next-btn">Next</button>
          </div>
        </div>
      `;

      // Re-select elements
      questionText = document.querySelector(".question-text");
      optionsList = document.querySelectorAll(".option");
      nextBtn = document.querySelector(".next-btn");
      questionCount = document.querySelector(".question-count");
      scoreText = document.querySelector(".score");

      // Show first question
      showQuestion();

      // Re-add Next button functionality
      nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          nextBtn.click();
        }
      });
    });
  }
});
