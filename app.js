const readyForm = document.querySelector("#readyForm");
const titleQuestion = document.querySelector("#titleQuestion");
const titleDesc = document.querySelector("p");
const readyButton = document.querySelector("button");
const game = document.querySelector("#game");

// global variables
// question number
let q;
// total number of correct answers
let ca = 0;
// API JSON array of questions
let questions = [];

// loads trivia game container
function loadGameContainer() {
  game.style.border = "4px solid black";
  game.style.width = "500px";
  game.style.height = "500px";
  game.style.padding = "5px";
  // make it flex container
  //   game.style.display = "flex";
  //   game.style.flexDirection = "column";
  //   game.style.justifyContent = "space-around";
  //   game.style.alignItems = "center";
  titleDesc.insertAdjacentElement("afterend", game);
  // return game HTML element
}

// creates all options for a selection
function createOptions(options, selection) {
  let newOption;
  for (const o of options) {
    newOption = document.createElement("option");
    newOption.value = o;
    newOption.innerText = o;
    selection.insertAdjacentElement("beforeend", newOption);
  }
}

// loads trivia questions
function askForSelections(startForm, type, options) {
  let selectionLabel = document.createElement("label");
  selectionLabel.for = type;
  // capitalizes first letter
  selectionLabel.innerText =
    type.charAt(0).toUpperCase() + type.slice(1) + ": ";
  startForm.insertAdjacentElement("beforeend", selectionLabel);
  let select = document.createElement("select");
  select.name = type;
  select.id = type;
  // create options
  createOptions(options, select);
  selectionLabel.insertAdjacentElement("afterend", select);
}

// helper function to display refresh form and button
function displayRefreshButton() {
  let refreshForm = document.createElement("form");
  refreshForm.action = "/home";
  refreshForm.id = "refreshForm";
  game.insertAdjacentElement("beforeend", refreshForm);
  let refreshButton = document.createElement("button");
  refreshButton.innerText = "Play Again";
  refreshForm.insertAdjacentElement("beforeend", refreshButton);
}

function playGame(e, q) {
  // create form
  let form = document.createElement("form");
  form.action = "/next";
  form.id = "gameForm";
  // set flex properties
  // form.style.display = "flex";
  // form.style.flexDirection = "column";
  // form.style.gap = "5px";
  game.insertAdjacentElement("beforeend", form);
  let question = document.createElement("p");
  let answerInput, answerLabel;
  // display question
  question.innerText = `${q}. ` + e.question;
  form.insertAdjacentElement("beforeend", question);
  // display answers
  const shuffledAnswers = [];
  for (let i of e.incorrect_answers) {
    shuffledAnswers.push(i);
  }
  shuffledAnswers.push(e.correct_answer);
  shuffledAnswers.sort((a, b) => 0.5 - Math.random());

  for (let ans of shuffledAnswers) {
    answerInput = document.createElement("input");
    answerInput.type = "radio";
    if (ans !== e.correct_answer) {
      answerInput.id = ans.toLowerCase();
    } else {
      answerInput.id = "correct";
    }
    answerInput.name = "possibleAnswers";
    answerInput.value = ans;
    form.insertAdjacentElement("beforeend", answerInput);
    answerLabel = document.createElement("label");
    if (ans !== e.correct_answer) {
      answerLabel.for = ans.toLowerCase();
    } else {
      answerLabel.for = "correct";
    }
    answerLabel.innerText = ans;
    form.insertAdjacentElement("beforeend", answerLabel);
  }
  let submitAnswerButton = document.createElement("button");
  submitAnswerButton.innerText = "Submit";
  submitAnswerButton.style.display = "block";
  form.insertAdjacentElement("beforeend", submitAnswerButton);
}

readyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  titleQuestion.remove();
  readyForm.remove();
  // load options
  loadGameContainer();
  // create form
  let startForm = document.createElement("form");
  startForm.action = "/game";
  startForm.id = "startForm";
  // set flexbox properties
  startForm.style.display = "flex";
  startForm.style.flexDirection = "column";
  startForm.style.gap = "10px";
  game.insertAdjacentElement("beforeend", startForm);

  // load category option
  const categoryOptions = ["General Knowledge", "Sports", "History"];
  askForSelections(startForm, "category", categoryOptions);
  // load difficulty options
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  askForSelections(startForm, "difficulty", difficultyOptions);
  // load format of quiz options
  const formatOptions = ["Multiple Choice", "True/False"];
  askForSelections(startForm, "format", formatOptions);
  // load start button
  const startButton = document.createElement("button");
  startButton.innerText = "Start";

  startForm.insertAdjacentElement("beforeend", startButton);
  // retrieve selections
});

game.addEventListener("submit", async function (e) {
  e.preventDefault();
  // when quiz type selections are made
  if (e.target.id === "startForm") {
    let categorySelection = document.querySelector("#category");
    let difficultySelection = document.querySelector("#difficulty");
    let formatSelection = document.querySelector("#format");
    const startForm = document.querySelector("#startForm");
    startForm.remove();
    // make API HTTP request
    // set category selection to category number in url
    if (categorySelection.value === "General Knowledge") {
      categorySelection = "9";
    } else if (categorySelection.value === "Sports") {
      categorySelection = "21";
    } else {
      categorySelection = "23";
    }
    if (difficultySelection.value === "Easy") {
      difficultySelection = "easy";
    } else if (difficultySelection === "Medium") {
      difficultySelection.value = "medium";
    } else {
      difficultySelection = "hard";
    }
    if (formatSelection.value === "Multiple Choice") {
      formatSelection = "multiple";
    } else {
      formatSelection = "boolean";
    }
    res = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${categorySelection}&difficulty=${difficultySelection}&type=${formatSelection}&`
    );
    // if there is no quiz found
    if (res.data.results.length === 0) {
      const errorMessage = document.createElement("p");
      errorMessage.innerText =
        "Sorry, quiz not available. Select Play Again button to reset.";
      game.insertAdjacentElement("beforeend", errorMessage);
      // display refresh button
      displayRefreshButton();
    } else {
      q = 1;
      questions = res.data.results;
      playGame(questions[0], q);
    }
  }
  // when quiz selections are made
  else if (e.target.id === "gameForm") {
    // find user's selected answer
    console.log(e);
    let userAnswer = document.querySelector(
      "input[name='possibleAnswers']:checked"
    );
    let correctAnswer = document.querySelector("input[id='correct']");
    let result = document.createElement("p");
    if (userAnswer.value === correctAnswer.value) {
      ++ca;
      result.innerText = "Correct!";
      game.insertAdjacentElement("beforeend", result);
    } else {
      result.innerText = "Incorrect. Correct Answer: " + correctAnswer.value;
      game.insertAdjacentElement("beforeend", result);
    }
    await setTimeout(5000);
    let gameForm = document.querySelector("#gameForm");
    result.remove();
    gameForm.remove();
    // move on to next question
    if (q !== 10) {
      ++q;
      playGame(questions[q - 1], q);
    }
    // else last question
    else {
      const results = document.createElement("p");
      results.innerText = "Score: " + ca + "/10";
      game.insertAdjacentElement("beforeend", results);
      // Display refresh button
      displayRefreshButton();
    }
  } else {
    console.log(e.target);
    window.location.href = window.location.href;
  }
});
