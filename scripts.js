const welcomePopupMessage = document.getElementById("welcome-prompt-container");
// const namSubBtn = document.getElementById("nameSubBtn");
const winResults = document.getElementById("winResults");
const nameInputField = document.getElementById("welcome-prompt");
let resultCnt = null;
const welcomeName = document.getElementById("welcomeTxt");
const resetUserBtn = document.getElementById("clearUserBtn");
const switchUserBtn = document.getElementById("switchUserBtn");
let userPick = null;
const emojiOptions = {
  1: { name: "rock-emoji", symbol: "👊" },
  2: { name: "paper-emoji", symbol: "🖐️" },
  3: { name: "scissors-emoji", symbol: "✌️" },
};
//#region Declared Variables
let gameInfo = { username: null, win: 0, lose: 0, tie: 0 };
let gameInfoTemplate = { username: null, win: 0, lose: 0, tie: 0 };

let isLoggedIn = false;
let compPick = null;
const resetBtn = document.getElementById("resetBtn");
//#endregion
function getName() {
  if (localStorage.length === 0) {
    welcomePopupMessage.style.visibility = "visible";
    const promptBtn = document.getElementsByClassName("promptBtn");
    nameInputField.addEventListener("keydown", (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        loginUser();
      }
    });

    const nameSubBtn = document.getElementById("nameSubBtn");
    nameSubBtn.addEventListener("mouseover", () => {
      if (nameInputField.value.length === 0) {
        // nameSubBtn.innerText = "Enter a Username";
        // nameSubBtn.style.cursor = "not-allowed";
      }
    });
    nameSubBtn.addEventListener("mouseout", () => {
      //   nameSubBtn.innerText = "Submit";
    });

    for (const btn of promptBtn) {
      btn.addEventListener("click", () => {
        if (gameInfo.username === null && btn.value === "Username") {
          loginUser();
        } else if (btn.value === "Guest") {
          gameInfo = gameInfoTemplate;
          hidePopUp();
        } else if (nameInputField.value === "") {
          gameInfo = gameInfoTemplate;

          hidePopUp();
        } else if ((gameInfo.username.length = 1)) {
          display_score();
          hidePopUp();
          isLoggedIn = true;
        } else {
          //   alert("Enter a valid username or continue as a guest.");

          loginUser();
        }
      });
    }
  } else {
    const keys = Object.keys(localStorage);
    const lastUser = keys[keys.length - 1];
    const savedData = JSON.parse(localStorage.getItem(lastUser));
    gameInfo = savedData;
    console.log("Loaded saved user:", gameInfo);
    hidePopUp();
    display_score();
  }
}

function loginUser() {
  gameInfo.username = nameInputField.value.trim();
  nameInputField.value = "";
  console.log(gameInfo);
  localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
  isLoggedIn = true;
  resetUserBtn.style.visibility = "visible";
  hidePopUp();
}

function hidePopUp() {
  welcomePopupMessage.style.visibility = "hidden";
  resetUserBtn.style.visibility = "visible";

  if (gameInfo.username !== null) {
    if (gameInfo.username.length >= 1) {
      welcomeName.innerHTML = `Welcome ${gameInfo.username}!`;
      welcomeName.style.fontSize = "3rem";
    }
  } else {
  }
}

function logUserOut() {
  resetUserBtn.addEventListener("click", () => {
    resetUserData();
    gameInfo = { win: 0, lose: 0, tie: 0 };
    compPick = null;
    display_score();
  });
}
function resetUserData() {
  localStorage.clear();
  isLoggedIn = false;
  welcomeName.innerHTML = `Welcome!`;
  resetUserBtn.style.visibility = "hidden";
  gameInfo = gameInfoTemplate;
  welcomePopupMessage.style.visibility = "visible";
  gameInfo = { win: 0, lose: 0, tie: 0 };

  getName();
}
function clearGuestOnRefresh() {
  if (gameInfo.username === null) {
    resetUserData();
  }
}

function pickEmoji() {
  const emojiNode = window.document.getElementsByClassName("emojiIcon");

  for (const emoji of emojiNode) {
    emoji.addEventListener("click", () => {
      getCompPick();
      userPick = emoji.id;

      switch (emoji.id) {
        case "rock-emoji":
          if (compPick.name === "rock-emoji") {
            gameInfo.tie++;
            display_score();
            break;
          } else if (compPick.name === "scissors-emoji") {
            gameInfo.win++;
            display_score();
            break;
          } else {
            gameInfo.lose++;
            display_score();
            break;
          }

        case "scissors-emoji":
          if (compPick.name === "scissors-emoji") {
            gameInfo.tie++;
            display_score();

            break;
          } else if (compPick.name === "paper-emoji") {
            gameInfo.win++;
            display_score();

            break;
          } else {
            gameInfo.lose++;
            display_score();

            break;
          }

        case "paper-emoji":
          if (compPick.name === "paper-emoji") {
            gameInfo.tie++;
            display_score();
            break;
          } else if (compPick.name === "scissors-emoji") {
            gameInfo.lose++;
            display_score();
            break;
          } else {
            gameInfo.win++;

            display_score();
            break;
          }
      }
    });
  }
}

function randomPick() {}

function display_score() {
  console.log(
    `Wins: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}`
  );
  if (userPick && compPick) {
    winResults.innerHTML = `
  <div class="results-container" id="results-container">
    <span>Computer Pick:</span> 
    <img src="./imgs/${compPick.name}.png" class="resultsEmoji" alt="${compPick.name}">
    <span> | Your Pick:</span> 
    <img src="./imgs/${userPick}.png" class="resultsEmoji" alt="${userPick}">
  </div>
  <div>Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}</div>`;
    resultCnt = document.getElementById("results-container");
    document.title = `Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}`;
    localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
  } else {
    winResults.innerHTML = `
  <div>Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}</div>`;
    document.title = `Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}`;
    localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
  }
}

function getCompPick() {
  const ranNum = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  let newCompPick = emojiOptions[ranNum];
  console.log(compPick);
  compPick = newCompPick;
  winResults.innerHTML = `
  <div class="results-container">
   
  <div>Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}</div>`;
  document.title = `Win: ${gameInfo.win} | Lose: ${gameInfo.lose} | Tie: ${gameInfo.tie}`;

  localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
}

function resetScoreBtns() {
  btn = resetBtn.addEventListener("click", () => {
    gameInfo.win = 0;
    gameInfo.lose = 0;
    gameInfo.tie = 0;
    compPick = null;

    display_score();
  });
}

clearGuestOnRefresh();
getName();
pickEmoji();
display_score();
resetScoreBtns();
logUserOut();
