"use script";
function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  clearMessages();
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  clearMessages();
}

function clearMessages() {
  document.getElementById("loginMessage").style.display = "none";
  document.getElementById("registerMessage").style.display = "none";
}

function displayMessage(elementId, message, isSuccess) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.className = `message ${isSuccess ? "success" : "error"}`;
  messageElement.style.display = "block";
}

function register() {
  const username = document.getElementById("newUname").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPsw").value;

  if (username && email && password) {
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    displayMessage("registerMessage", "Registration successful!", true);
    setTimeout(showLogin, 2000);
  } else {
    displayMessage("registerMessage", "Please fill in all fields.", false);
  }
}

function login(e) {
  const username = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser.username === username && storedUser.password === password) {
    e.preventDefault();
    displayMessage("loginMessage", "Login successful!", true);

    window.location.href = "html/games.html";

    return true;
  } else {
    displayMessage("loginMessage", "Invalid username or password.", false);
    return false;
  }
}
