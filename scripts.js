const welcomePopupMessage = document.getElementById("welcome-prompt-container");
// const namSubBtn = document.getElementById("nameSubBtn");
const nameInputField = document.getElementById("welcome-prompt");
const emojiOptions = {
  1: { name: "rock-emoji", symbol: "👊" },
  2: { name: "paper-emoji", symbol: "🖐️" },
  3: { name: "scissor-emoji", symbol: "✌️" },
};
let gameInfo = { username: null, win: 0, lose: 0, tie: 0 };
let compPick = null;
function getName() {
  if (localStorage.length === 0) {
    welcomePopupMessage.style.visibility = "visible";
    const promptBtn = document.getElementsByClassName("promptBtn");
    for (const btn of promptBtn) {
      btn.addEventListener("click", () => {
        if (btn.value === "Username")
          if ((gameInfo.username.length = 1)) {
            gameInfo.username = nameInputField.value.trim();
            console.log(gameInfo);
            localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
            hidePopUp();
          } else {
            alert("Enter a valid username or continue as a guest.");
          }
        else {
          hidePopUp();
        }
      });
    }
  } else {
    const keys = Object.keys(localStorage);
    const lastUser = keys[keys.length - 1];
    const savedData = JSON.parse(localStorage.getItem(lastUser));
    gameInfo = savedData;
    console.log("Loaded saved user:", gameInfo);
  }
}

function hidePopUp() {
  welcomePopupMessage.style.visibility = "hidden";
}

function pickEmoji() {
  const emojiNode = window.document.getElementsByClassName("emojiIcon");
  getCompPick();
  for (const emoji of emojiNode) {
    emoji.addEventListener("click", () => {
      switch (emoji.id) {
        case "rock-emoji":
          if (compPick === "rock-emoji") {
            gameInfo.tie++;
            display_score();
            break;
          } else if (compPick === "scissor-emoji") {
            gameInfo.win++;
            display_score();
            break;
          } else {
            gameInfo.lose++;
            display_score();
            break;
          }

        case "scissor-emoji":
          if (compPick === "scissor-emoji") {
            gameInfo.tie++;
            break;
          } else if (compPick === "paper-emoji") {
            gameInfo.win++;
            break;
          } else {
            gameInfo.lose++;
            break;
          }

        case "paper-emoji":
          if (compPick === "paper-emoji") {
            gameInfo.tie++;
            display_score();
            break;
          } else if (compPick === "scissor-emoji") {
            gameInfo.win++;
            display_score();
            break;
          } else {
            gameInfo.lose++;
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
}

function getCompPick() {
  const ranNum = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  let newCompPick = emojiOptions[ranNum];
  console.log(compPick);
  compPick = newCompPick;
}

getName();
pickEmoji();
