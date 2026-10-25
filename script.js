
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
    kicker: "THE SCALE OF LOSS",
    prompt: "How much forest has disappeared over the past 35 years, compared to the total forest area in 1990?",
    answers: [
      "1 million square kilometers",
      "5 million square kilometers",
      "10 million square kilometers",
    ],
    correct: 1,
    explanation: "4.89 million square kilometers. 489 million hectares. That's around half the area of the continent of Europe. (Source: FAO, 2025)",
    cutscene: {
      title: "A forest holds a world.",
      description: "A deer slips through the trees. Every patch of forest is part of a much bigger living landscape.",
      focus: "deer",
    },
  },
  {
    kicker: "LOOK A LITTLE CLOSER",
    prompt: "When a forest is cleared, what can happen to the animals that live there?",
    answers: [
      "They can adapt to a new habitat",
      "They can lose the food and shelter they depend on",
      "They can just survive without a forest",  
    ],
    correct: 1,
    explanation: "Forests provide food, shelter, and places to raise young. Losing that habitat can put pressure on the species that depend on it.",
    cutscene: {
      title: "Every home has its neighbors.",
      description: "A woodpecker searches the old trees for food and shelter—small details that make a forest a home.",
      focus: "woodpecker",
    },
  },
  {
    kicker: "FOLLOW THE FOOTPRINTS",
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
      title: "Life keeps watch.",
      description: "From the forest floor to the canopy, countless species depend on connected, thriving habitats.",
      focus: "owl",
    },
  },
  {
    kicker: "BREATHE IN",
    prompt: "How much CO2 does deforestation release?",
    answers: [
      "69,000,000 metric tons",
      "1,069,000,000 metric tons",
      "4,100,000,000 metric tons",
    ],
    correct: 2,
    explanation: "In 2024, deforestation released 4.1 billion metric tons of CO2 into the atmosphere, accounting for 10% of global carbon dioxide emissions. (Source: Climate Council, 2026)",
    cutscene: {
      title: "The forest breathes with us.",
      description: "Trees take in carbon as they grow. Protecting forests helps keep this natural cycle alive.",
      focus: "leaves",
    },
  },
  {
    kicker: "WHICH CAUSES MOST DEFORESTATION?",
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
      title: "Small choices leave a trail.",
      description: "What we grow, buy, and use can shape the pressures forests face around the world.",
      focus: "woodpecker",
    },
  },
  {
    kicker: "MAKE A DIFFERENCE",
    prompt: "Which everyday choice can help forests? (please make this checkbox question so that students can select multiple answers)",
    answers: [
      "Waste more paper so demand goes up",
      "Choose responsibly sourced products and reuse paper often",
      "Ignore where products come from",
      "Reduce meat consumption and choose plant-based foods",

    ],
    correct: 1,
    explanation: "Using resources thoughtfully and choosing responsibly sourced products can help reduce pressure on forests.",
    cutscene: {
      title: "A little care goes a long way.",
      description: "Thoughtful choices help give forests and the life within them room to thrive.",
      focus: "deer",
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
const nextButton = document.querySelector("#next-question");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const cutscene = document.querySelector("#cutscene");
const cutsceneScene = document.querySelector("#cutscene-scene");
const cutsceneTitle = document.querySelector("#cutscene-title");
const cutsceneDescription = document.querySelector("#cutscene-description");
const continueButton = document.querySelector("#continue-quiz");

let currentQuestion = 0;
let score = 0;
let cutsceneTimer;

const cutsceneDuration = 4200;

function updateProgress(completed) {
  const progress = Math.min(completed, questions.length);
  progressFill.style.width = `${(progress / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
  progressTrack.setAttribute("aria-valuenow", String(progress));
}

function renderQuestion() {
  const question = questions[currentQuestion];

  questionCount.textContent = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  scoreCount.textContent = `${score} ${score === 1 ? "POINT" : "POINTS"}`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.prompt;
  answerList.replaceChildren();
  feedback.hidden = true;
  feedback.classList.remove("is-incorrect");
  nextButton.hidden = true;
  updateProgress(currentQuestion);

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.dataset.answerIndex = String(index);

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = answer;
    button.append(letter, text);
    button.addEventListener("click", () => chooseAnswer(index));
    answerList.append(button);
  });
}

function chooseAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) score += 1;
  scoreCount.textContent = `${score} ${score === 1 ? "POINT" : "POINTS"}`;
  answerList.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("is-correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("is-incorrect");
  });

  feedback.textContent = `${isCorrect ? "That’s right." : "Not quite."} ${question.explanation}`;
  feedback.classList.toggle("is-incorrect", !isCorrect);
  feedback.hidden = false;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "See your result" : "Next question";
  updateProgress(currentQuestion + 1);
  nextButton.hidden = false;
  nextButton.focus();
}

function showResults() {
  questionView.hidden = true;
  resultView.hidden = false;
  resultTitle.textContent = score === questions.length ? "A keen observer." : "Well explored.";
  resultCopy.textContent = `You got ${score} out of ${questions.length} questions right. Keep noticing the small things—every forest is full of connections worth protecting.`;
  restartButton.focus();
}

function startQuiz() {
  window.clearTimeout(cutsceneTimer);
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
  const event = questions[currentQuestion].cutscene;
  const forest = cover.querySelector(".forest-art").cloneNode(true);

  window.clearTimeout(cutsceneTimer);
  forest.setAttribute("class", "forest-art");
  cutsceneScene.replaceChildren(forest);
  cutscene.className = `cutscene cutscene--${event.focus}`;
  cutsceneTitle.textContent = event.title;
  cutsceneDescription.textContent = event.description;
  continueButton.textContent = currentQuestion === questions.length - 1
    ? "See your results"
    : "Continue to the next question";
  continueButton.hidden = true;
  quiz.hidden = true;
  cutscene.hidden = false;
  cutsceneTitle.focus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    continueButton.hidden = false;
    continueButton.focus();
    return;
  }

  cutsceneTimer = window.setTimeout(() => {
    continueButton.hidden = false;
    continueButton.focus();
  }, cutsceneDuration);
}

function returnToCover() {
  window.clearTimeout(cutsceneTimer);
  cutscene.hidden = true;
  quiz.hidden = true;
  cover.hidden = false;
  startButton.focus();
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", returnToCover);
nextButton.addEventListener("click", () => {
  showCutscene();
});
continueButton.addEventListener("click", () => {
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
});



/* Sources: https://www.iucnredlist.org/search?taxon_level%5B%5D=species&scopes%5B%5D=1&red_list_category_scales%5B%5D=ex&red_list_category_scales%5B%5D=ew&red_list_category_scales%5B%5D=cr&red_list_category_scales%5B%5D=en&red_list_category_scales%5B%5D=vu&habitats%5B%5D=1, 
https://www.climatecouncil.org.au/deforestation/, https://openknowledge.fao.org/items/6dfa0079-e156-47a2-9089-0274119e9cb7, */