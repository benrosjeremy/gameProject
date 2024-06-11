var storedUsers = JSON.parse(localStorage.getItem("users"));
if (storedUsers == null) storedUsers = [];
const user = storedUsers.find((user) => user.selectedUser == 1);
if (storedUsers != null)
  document.getElementById("user_info").textContent =
    "Welcome " +
    user.username +
    "!  your score in space ship game is: " +
    user.spacescore +
    ". your score in memory game is: " +
    user.memoryscore;
