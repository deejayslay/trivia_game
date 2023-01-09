const readyForm = document.querySelector("#readyForm");
const titleQuestion = document.querySelector("#titleQuestion");
const titleDesc = document.querySelector("p");
const readyButton = document.querySelector("button");

// loads trivia game container
function loadGameContainer() {
  const game = document.createElement("div");
  game.id = "game";
  game.style.border = "4px solid black";
  game.style.width = "500px";
  game.style.height = "500px";
  game.style.padding = "5px";
  // make it flex container
  game.style.display = "flex";
  game.style.flexDirection = "column";
  game.style.justifyContent = "space-around";
  game.style.alignItems = "center";
  titleDesc.insertAdjacentElement("afterend", game);
  // return game HTML element
  return game;
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
function askForSelections(game, type, options) {
  let selectionLabel = document.createElement("label");
  selectionLabel.for = type;
  // capitalizing first letter
  selectionLabel.innerText =
    type.charAt(0).toUpperCase() + type.slice(1) + ": ";
  game.insertAdjacentElement("beforeend", selectionLabel);
  let select = document.createElement("select");
  select.name = "type";
  // create options
  createOptions(options, select);
  selectionLabel.insertAdjacentElement("beforeend", select);
}

readyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  titleQuestion.remove();
  readyButton.remove();
  // load options
  game = loadGameContainer();
  // load category option
  const categoryOptions = ["General Knowledge", "Sports", "History"];
  askForSelections(game, "category", categoryOptions);
  // load difficulty options
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  askForSelections(game, "Difficulty", difficultyOptions);
  // load format of quiz options
  const formatOptions = ["Multiple Choice", "True/False"];
  askForSelections(game, "Format", formatOptions);
});
