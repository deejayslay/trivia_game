const readyForm = document.querySelector("#readyForm");
const titleQuestion = document.querySelector("#titleQuestion");
const titleDesc = document.querySelector("p");
const readyButton = document.querySelector("button");
const game = document.querySelector("#game");

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
  // capitalizing first letter
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
  startForm.style.display = "flex";
  startForm.style.flexDirection = "column";
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
    console.log(difficultySelection);
    console.log(formatSelection);
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${categorySelection}&difficulty=${difficultySelection}&type=${formatSelection}`
    );
    console.log(res.data);
  }
});
