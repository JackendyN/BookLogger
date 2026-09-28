import { getBooks } from "./storagemanager.js";
import { getCover } from "./coverstorage.js";

const logOutButton = document.getElementById("log-out");
logOutButton?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

if(logOutButton && sessionStorage.getItem("guest") === "true") {
    logOutButton.style.display = "none";
}

document.getElementById("view-books")?.addEventListener("click", () => {
    window.location.href = "books.html";
});

document.getElementById("book-wishlist")?.addEventListener("click", () => {
    window.location.href = "wishlist.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const bookContainer = document.getElementById("book-container");
    if(!bookContainer) return;
    const currentBooks = getBooks().filter((book) => book.reading);
    bookContainer.innerHTML = currentBooks.length > 1 ?
        "<h2>Current Book(s):</h2>"
        : "<h2>Current Book:</h2>"
    if(currentBooks.length === 0) {
        bookContainer.innerHTML = "";
    }
    currentBooks.forEach(async (book) => {
        const bookListing = document.createElement("div");
        bookListing.className = "book";
        if(book.cover) {
            const coverUrl = await getCover(book.cover);
                if (coverUrl) {
                    bookListing.innerHTML += `
                        <img class="book-cover"
                        src="${coverUrl}"
                        alt="Book Cover"
                        tabindex="0">
                    `;
                }
        }
        bookListing.innerHTML += `
            <h3><span class="bold">${book["book-name"]}</span></h3>
            <h4>by <span class="bold">${book["author-name"]}</span></h4>
        `;
        if(book.obtained === "borrowed" && book["date-due"]) {
            bookListing.innerHTML += `
                <h3><span class="bold">Due Date:
                ${book["date-due"].getMonth() + 1}/${book["date-due"].getUTCDate()}/${book["date-due"].getFullYear()}
                </span></h3>
            `
        }
        bookListing.innerHTML += "<hr>";
        bookContainer.appendChild(bookListing);
    });
});
