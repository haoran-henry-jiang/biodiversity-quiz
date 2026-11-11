
/* Quiz involving 5-6 questions aiming to raise awareness about the biodiversity of Jeju and encourage people to 
 sustainable choices regarding their eating, shopping and living habits. Target audience is students aged 11-18.  -->


<!--using a conjunction of html,css and javascript to achieve immersive graphics that bring impact to each question. The questions
that should be included are:
        -How much forest has disappeared over the past 100 years?
        -How many species ahve been critically endangered/gone extinct in forest habitats that have been destroyed in the past 100 years?
        -How much CO2 does deforestation release?
        -Which industries/land causes most deforestation?
        -What species live in the forest on Jeju?
        -What can you do to help?*/

const questions = [
  {
    kicker: "SO MUCH LOSS! WHERE DID IT ALL GO?",
    prompt: "How much forest has disappeared over the past 35 years, compared to the total forest area in 1990?",
    answers: [
      "1 million square kilometers",
      "5 million square kilometers",
      "10 million square kilometers",
    ],
    correct: 1,
    explanation: "4.89 million square kilometers. 489 million hectares. That's around half the area of the continent of Europe. (Source: FAO, 2025)",
    cutscene: {
      title: "Forest loss, measured against Europe.",
      description: "The forest lost since 1990 covers nearly half the area of Europe.",
      src: "assets/q1_forest_loss.svg",
      duration: 21_400,
    },
  },
  {
    kicker: "Imagine a giant came and knocked down your houses!",
    prompt: "When a forest is cleared, what can happen to the animals that live there?",
    answers: [
      "They can adapt to a new habitat",
      "They can lose the food and shelter they depend on",
      "They can just survive without a forest",  
    ],
    correct: 1,
    explanation: "Forests provide food, shelter, and places to raise young. Losing that habitat can put pressure on the species that depend on it.",
    cutscene: {
      title: "When a forest is cleared, animals lose their home.",
      description: "Without food and shelter, animals that depend on the forest are put at risk.",
      src: "assets/q2_deer_habitat.svg",
      duration: 18_600,
    },
  },
  {
    kicker: "MASS DISAPPEARANCE! The 6th Mass extinction event: the anthropocene.",
    prompt: "How many species have been critically endangered or gone extinct in forest habitats that have been destroyed?",
    answers: [
    "5,000 species",
      "Over 10,000 species",
      "Over 20,000 species",
      "Over 30,000 species",
    ],
    correct: 3,
    explanation: "Over 30,000 species are classified as endangered or extinct in forest habitats that are being destroyed, including 22,000 plant species and 8,000 animal species. There are probably more threatened. (Source: IUCN Red List, 2026)",
    cutscene: {
      title: "Species lost from forest habitats.",
      description: "The animation follows five species whose forest homes have been lost.",
      src: "assets/q3_extinct_species.svg",
      duration: 33_400,
    },
  },
  {
    kicker: "Carbon dioxide sponges that get cut down...",
    prompt: "How much CO2 does deforestation release?",
    answers: [
      "69,000,000 metric tons",
      "1,069,000,000 metric tons",
      "4,100,000,000 metric tons",
    ],
    correct: 2,
    explanation: "In 2024, deforestation released 4.1 billion metric tons of CO2 into the atmosphere, accounting for 10% of global carbon dioxide emissions. (Source: Climate Council, 2026)",
    cutscene: {
      title: "Deforestation releases carbon dioxide.",
      description: "The animation compares emissions from deforestation with all other global carbon dioxide emissions.",
      src: "assets/q4_co2_release.svg",
      duration: 18_400,
    },
  },
  {
    kicker: "WHICH IS RESPONSIBLE FOR THE MOST TREES CUT DOWN?",
    prompt: "Which industries are causing the most deforestation?",
    answers: [
      "Agriculture (livestock, soy, crops)",
      "Logging (timber, paper, etc.)",
      "Mining (copper, coal, nickel,etc.)",
      "Infrastructure development (roads, cities, etc.)",

    ],
    correct: 0,
    explanation: "Beef production is the single largest driver of deforestation worldwide. Period. (NEEDS MORE EXPLANATION)",
    cutscene: {
      title: "Agriculture drives most deforestation.",
      description: "The chart compares the main causes of global deforestation.",
      src: "assets/q5_drivers_pie.svg",
      duration: 27_000,
    },
  },
  {
    kicker: "You may be thinking, there's no way I can help! Well, you most definitely can.",
    prompt: "Which everyday choices can help forests? Select all that apply.",
    answers: [
      "Waste more paper so demand goes up",
      "Choose responsibly sourced products and reuse paper often",
      "Ignore where products come from",
      "Reduce meat consumption and choose plant-based foods",

    ],
    correct: [1, 3],
    multipleSelect: true,
    explanation: "Choosing responsibly sourced products, reusing paper, and reducing meat consumption can help reduce pressure on forests.",
    cutscene: {
      title: "Everyday choices can help forests.",
      description: "The animation shows how choices about food and paper can help reduce pressure on forests.",
      src: "assets/q6_everyday_choices.svg",
      duration: 25_500,
    },
  },
];

const cover = document.querySelector("#cover");
const quiz = document.querySelector("#quiz");
const startButton = document.querySelector("#start-quiz");
const backButton = document.querySelector("#back-home");
const restartButton = document.querySelector("#restart-quiz");
const questionView = document.querySelector("#question-view");
const resultView = document.querySelector("#result-view");
const questionTitle = document.querySelector("#quiz-title");
const questionKicker = document.querySelector("#question-kicker");
const questionCount = document.querySelector("#question-count");
const scoreCount = document.querySelector("#score-count");
const answerList = document.querySelector("#answer-list");
const feedback = document.querySelector("#feedback");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const cutscene = document.querySelector("#cutscene");
const cutsceneScene = document.querySelector("#cutscene-scene");
const cutsceneTitle = document.querySelector("#cutscene-title");
const cutsceneDescription = document.querySelector("#cutscene-description");
const cutsceneProgress = document.querySelector("#cutscene-progress");
const cutsceneProgressTrack = document.querySelector("#cutscene-progress-track");
const continueButton = document.querySelector("#continue-quiz");
const cutsceneError = document.querySelector("#cutscene-error");

let currentQuestion = 0;
let score = 0;
let answerTimer;
let cutsceneTimer;
let transitionTimer;
const answerFeedbackDuration = 650;
const leafTransitionDuration = 820;
const finalFrameHold = 3000;

function updateProgress(completed) {
  const progress = Math.min(completed, questions.length);
  progressFill.style.width = `${(progress / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
  progressTrack.setAttribute("aria-valuenow", String(progress));
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const selectedAnswers = new Set();
  const multipleSelect = question.multipleSelect === true;
  let submitButton;

  quiz.classList.remove("is-transitioning");
  questionCount.textContent = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  scoreCount.textContent = `${score} ${score === 1 ? "POINT" : "POINTS"}`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.prompt;
  answerList.replaceChildren();
  feedback.hidden = true;
  feedback.classList.remove("is-incorrect");
  updateProgress(currentQuestion);

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = multipleSelect ? "answer-option is-multiple-choice" : "answer-option";
    button.type = "button";
    button.dataset.answerIndex = String(index);
    if (multipleSelect) button.setAttribute("aria-pressed", "false");

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = multipleSelect ? "" : String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = answer;
    button.append(letter, text);
    button.addEventListener("click", () => {
      if (!multipleSelect) {
        chooseAnswer(index);
        return;
      }

      if (selectedAnswers.has(index)) {
        selectedAnswers.delete(index);
        button.classList.remove("is-selected");
      } else {
        selectedAnswers.add(index);
        button.classList.add("is-selected");
      }
      button.setAttribute("aria-pressed", String(selectedAnswers.has(index)));
      submitButton.disabled = selectedAnswers.size === 0;
    });
    answerList.append(button);
  });

  if (multipleSelect) {
    submitButton = document.createElement("button");
    submitButton.className = "start-button answer-submit";
    submitButton.type = "button";
    submitButton.textContent = "Check answers";
    submitButton.disabled = true;
    submitButton.addEventListener("click", () => chooseAnswer([...selectedAnswers]));
    answerList.append(submitButton);
  }
}

function chooseAnswer(selectedAnswer) {
  const question = questions[currentQuestion];
  const selectedAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
  const correctAnswers = Array.isArray(question.correct) ? question.correct : [question.correct];
  const isCorrect = selectedAnswers.length === correctAnswers.length
    && selectedAnswers.every((answer) => correctAnswers.includes(answer));

  if (isCorrect) score += 1;
  scoreCount.textContent = `${score} ${score === 1 ? "POINT" : "POINTS"}`;
  answerList.querySelectorAll("button").forEach((button, index) => {
    if (!button.classList.contains("answer-option")) return;
    button.disabled = true;
    if (correctAnswers.includes(index)) button.classList.add("is-correct");
    if (selectedAnswers.includes(index)) {
      if (!correctAnswers.includes(index)) button.classList.add("is-incorrect");
      button.classList.add("is-flashing");
    }
  });

  feedback.textContent = `${isCorrect ? "That’s right." : "Not quite."} ${question.explanation}`;
  feedback.classList.toggle("is-incorrect", !isCorrect);
  feedback.hidden = false;
  updateProgress(currentQuestion + 1);
  answerTimer = window.setTimeout(() => {
    quiz.classList.add("is-transitioning");
    const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : leafTransitionDuration;
    transitionTimer = window.setTimeout(showCutscene, transitionDuration);
  }, answerFeedbackDuration);
}

function showResults() {
  questionView.hidden = true;
  resultView.hidden = false;
  resultTitle.textContent = score === questions.length ? "A Wildlife Enthusiast!" : "Well explored.";
  resultCopy.textContent = `You got ${score} out of ${questions.length} questions right. Keep noticing the small things—every forest is full of connections worth protecting.`;
  restartButton.focus();
}

function startQuiz() {
  window.clearTimeout(answerTimer);
  window.clearTimeout(cutsceneTimer);
  window.clearTimeout(transitionTimer);
  currentQuestion = 0;
  score = 0;
  questionView.hidden = false;
  resultView.hidden = true;
  cutscene.hidden = true;
  cover.hidden = true;
  quiz.hidden = false;
  renderQuestion();
  questionTitle.focus();
}

function showCutscene() {
  const { cutscene: event, explanation, prompt } = questions[currentQuestion];
  const animation = document.createElement("img");

  window.clearTimeout(cutsceneTimer);
  cutscene.classList.remove("is-ready");
  continueButton.hidden = true;
  cutsceneProgress.style.width = "0%";
  cutsceneProgressTrack.setAttribute("aria-valuenow", "0");
  animation.className = "cutscene-art";
  animation.alt = `${prompt} ${explanation}`;
  animation.addEventListener("load", () => {
    if (cutscene.hidden || cutsceneScene.firstElementChild !== animation) return;
    cutsceneProgress.style.setProperty("--cutscene-duration", `${event.duration}ms`);
    void cutsceneProgress.offsetWidth;
    cutsceneProgress.style.width = "100%";
    cutsceneTimer = window.setTimeout(() => {
      cutsceneProgressTrack.setAttribute("aria-valuenow", "100");
      cutsceneProgressTrack.setAttribute("aria-valuetext", "Animation complete. Next question available.");
      cutscene.classList.add("is-ready");
      continueButton.hidden = false;
    }, event.duration + finalFrameHold);
  }, { once: true });
  animation.addEventListener("error", () => {
    if (cutscene.hidden || cutsceneScene.firstElementChild !== animation) return;
    cutsceneError.textContent = "The animation could not be loaded.";
    cutsceneError.hidden = false;
    cutsceneTimer = window.setTimeout(() => {
      cutscene.classList.add("is-ready");
      continueButton.hidden = false;
    }, finalFrameHold);
  }, { once: true });
  cutsceneScene.replaceChildren(animation);
  cutsceneError.hidden = true;
  cutsceneTitle.textContent = event.title;
  cutsceneDescription.textContent = `${event.description} ${explanation}`;
  cutsceneProgressTrack.setAttribute("aria-valuetext", `0 of ${event.duration / 1000} seconds`);
  quiz.hidden = true;
  cutscene.hidden = false;
  cutsceneTitle.focus();
  animation.src = event.src;
}

function advanceFromCutscene() {
  window.clearTimeout(answerTimer);
  window.clearTimeout(cutsceneTimer);
  window.clearTimeout(transitionTimer);
  cutscene.hidden = true;
  if (currentQuestion === questions.length - 1) {
    quiz.hidden = false;
    showResults();
    return;
  }

  currentQuestion += 1;
  quiz.hidden = false;
  renderQuestion();
  questionTitle.focus();
}

function returnToCover() {
  window.clearTimeout(answerTimer);
  window.clearTimeout(cutsceneTimer);
  window.clearTimeout(transitionTimer);
  cutscene.hidden = true;
  quiz.hidden = true;
  cover.hidden = false;
  startButton.focus();
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", returnToCover);
continueButton.addEventListener("click", advanceFromCutscene);



/* Sources: https://www.iucnredlist.org/search?taxon_level%5B%5D=species&scopes%5B%5D=1&red_list_category_scales%5B%5D=ex&red_list_category_scales%5B%5D=ew&red_list_category_scales%5B%5D=cr&red_list_category_scales%5B%5D=en&red_list_category_scales%5B%5D=vu&habitats%5B%5D=1, 
https://www.climatecouncil.org.au/deforestation/, https://openknowledge.fao.org/items/6dfa0079-e156-47a2-9089-0274119e9cb7, */