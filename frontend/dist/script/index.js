"use strict";
document.querySelector("#guest")?.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("guest", "true");
    window.location.href = "home.html";
});
const loginButtons = Array.from(document.querySelectorAll('#login-form button:not(#login-form button[id="guest"])'));
loginButtons.forEach((button) => {
    button.addEventListener("click", (e) => e.preventDefault());
});
// Temporarily wipes storage each load
document.addEventListener("DOMContentLoaded", () => {
    window.localStorage.setItem("local-books", "");
    window.localStorage.setItem("future-local-books", "");
});
