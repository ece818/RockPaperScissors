export function loginUser() {
  gameInfo.username = nameInputField.value.trim();
  nameInputField.value = "";
  console.log(gameInfo);
  localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
  isLoggedIn = true;
  resetUserBtn.style.visibility = "visible";
  hidePopUp();
}
