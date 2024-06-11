// "use script";
// function showRegister() {
//   document.getElementById("loginForm").style.display = "none";
//   document.getElementById("registerForm").style.display = "block";
//   clearMessages();
// }

// function showLogin() {
//   document.getElementById("registerForm").style.display = "none";
//   document.getElementById("loginForm").style.display = "block";
//   clearMessages();
// }

// function clearMessages() {
//   document.getElementById("loginMessage").style.display = "none";
//   document.getElementById("registerMessage").style.display = "none";
// }

// function displayMessage(elementId, message, isSuccess) {
//   const messageElement = document.getElementById(elementId);
//   messageElement.textContent = message;
//   messageElement.className = `message ${isSuccess ? "success" : "error"}`;
//   messageElement.style.display = "block";
// }

// function register() {
//   const username = document.getElementById("newUname").value;
//   const email = document.getElementById("newEmail").value;
//   const password = document.getElementById("newPsw").value;

//   if (username && email && password) {
//     const user = { username, email, password };
//     localStorage.setItem("user", JSON.stringify(user));
//     displayMessage("registerMessage", "Registration successful!", true);
//     setTimeout(showLogin, 2000);
//   } else {
//     displayMessage("registerMessage", "Please fill in all fields.", false);
//     setTimeout(showLogin, 2000);
//   }
// }

// function login(e) {
//   const username = document.getElementById("uname").value;
//   const password = document.getElementById("psw").value;
//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   if (storedUser.username === username && storedUser.password === password) {
//     e.preventDefault();
//     displayMessage("loginMessage", "Login successful!", true);

//     window.location.href = "html/games.html";

//     return true;
//   } else {
//     displayMessage("loginMessage", "Invalid username or password.", false);
//     return false;
//   }
// }
"use strict";

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

function clearInputs(formId) {
  const form = document.getElementById(formId);
  form.reset();
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasTav=/[!@#$%^&*]/.test(password);
  return password.length >= minLength && hasLetter && hasNumber&&hasTav;
}

function register(e) {
  e.preventDefault(); // Prevent default form submission
  const username = document.getElementById("newUname").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPsw").value;
  const confirmPassword = document.getElementById("confirmPsw").value;

  if (!username || !email || !password || !confirmPassword) {
    displayMessage("registerMessage", "Please fill in all fields.", false);
    return;
  }

  if (!validateEmail(email)) {
    displayMessage("registerMessage", "Invalid email address.", false);
    return;
  }

  if (password !== confirmPassword) {
    displayMessage("registerMessage", "Passwords do not match.", false);
    return;
  }

  if (!validatePassword(password)) {
    displayMessage("registerMessage", "Password must be at least 6 characters long and include both letters and numbers.", false);
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = storedUsers.some(user => user.username === username);

  if (userExists) {
    displayMessage("registerMessage", "Username already exists.", false);
    return;
  }

  const user = { username, email, password };
  storedUsers.push(user);
  localStorage.setItem("users", JSON.stringify(storedUsers));
  displayMessage("registerMessage", "Registration successful!", true);
  clearInputs("registerForm");
  setTimeout(showLogin, 2000);
}

function login(e) {
  e.preventDefault(); // Prevent default form submission
  const username = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const user = storedUsers.find(user => user.username === username && user.password === password);

  if (user) {
    displayMessage("loginMessage", "Login successful!", true);
    clearInputs("loginForm");
    setTimeout(() => {
      window.location.href = "html/games.html";
    }, 2000);
  } else {
    displayMessage("loginMessage", "Invalid username or password.", false);
  }
}

document.getElementById("registerForm").addEventListener("submit", register);
document.getElementById("loginForm").addEventListener("submit", login);
