import {  FutureBook } from "./bookinterfaces.js";
import { changeResetVisibility } from "./booklist.js";
import { getCover } from "./coverstorage.js";

let bookArray: FutureBook[] = [];
export const getFutureBooks = (): FutureBook[] => {
    const books = localStorage.getItem("future-local-books");
    if (!books) return [];
    const parsedBooks = JSON.parse(books) || [];
    return parsedBooks;
}

let currentFilters: {
    borrowing: boolean,
    owning: boolean,
    author?: string
} = {
    borrowing: true,
    owning: true
};

const applyFilters = (books: FutureBook[]) => {
    let newBooks: FutureBook[] = books;
    
    if(currentFilters.borrowing && !currentFilters.owning) {
        newBooks = newBooks.filter((book) => book.obtaining === "borrowing")
    } else if(currentFilters.owning && !currentFilters.borrowing) {
        newBooks = newBooks.filter((book) => book.obtaining === "owning")
    }
    if(Object.hasOwn(currentFilters, "author") && currentFilters.author) {
        const authorExp = new RegExp(currentFilters.author, "i");
        newBooks = newBooks.filter((book) => authorExp.test(book["author-name"]));
    }

    return newBooks;
}

const obtainedFilterForm = document.getElementById("obtain-filter-form") as HTMLFormElement;
obtainedFilterForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const data = new FormData(obtainedFilterForm);
    currentFilters.borrowing = Boolean(data.get("borrowed"));
    currentFilters.owning = Boolean(data.get("owned"));
    search.value = "";
    changeResetVisibility("show");
    renderBooks(bookArray);
});

(document.getElementById("author-filter-form") as HTMLFormElement)
    ?.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const authorInput = document.getElementById("author-filter-input") as HTMLInputElement;
        if(authorInput.value.trim().length > 0) {
            currentFilters.author = authorInput.value;
            search.value = "";
            changeResetVisibility("show");
            renderBooks(bookArray);
        }
    });

const filterResetButton = document.getElementById("reset-filters") as HTMLButtonElement;
filterResetButton?.addEventListener("click", () => {
    // Default values
    currentFilters = { borrowing: true, owning: true };
    search.value = "";
    changeResetVisibility("hide");
    renderBooks(bookArray);
});

const search = document.getElementById("search") as HTMLInputElement;
if (search) {
    search.addEventListener("input", () => {
        const value = search.value;
        const termRegex: RegExp = new RegExp(value, "i");
        const filteredArray = bookArray.filter((book) => termRegex.test(book["book-name"]));
        renderBooks(filteredArray);
    });
}

const renderBooks = (books: FutureBook[]) => {
    books = applyFilters(books);
    const bookContainer = document.getElementById("book-container");
    if (!bookContainer) return;
    bookContainer.innerHTML = "";

    books.forEach(async (book) => {
        const listing = document.createElement("div");
        listing.className = "book-listing";
        if (book.cover) {
            const coverUrl = await getCover(book.cover);
                if (coverUrl) {
                    listing.innerHTML += `
                        <img class="book-cover"
                        src="${coverUrl}"
                        alt="Book Cover"
                        tabindex="0">
                    `;
                }
        } else {
            listing.style.gridTemplateColumns = "1fr 1fr";
        }
        listing.innerHTML += `
            <div class="book-info">
                <h3><span class="bold book-name">${book["book-name"]}</span></h3>
                <h4>by <span class="bold">${book["author-name"]}</span></h4>
            </div>
        `;
        if (book.obtaining === "borrowing") {
            listing.innerHTML += `
                <div class="when-obtained">
                    <h3><span class="bold">Borrowing</span></h3>
                    <h3>${book.location ? "From " + book.location : ""}</h3>
                </div>
            `;
        } else {
            listing.innerHTML += `
                <div class="when-obtained">
                    <h3><span class="bold">Owning</span></h3>
                    <h3>${book.location ? "From " + book.location : ""}</h3>
                </div>
            `;
        }

        bookContainer.appendChild(listing);
        const bookCovers = Array.from(
            document.querySelectorAll(".book-cover, .book-name"),
        );
        bookCovers.forEach((cover) =>
            cover.addEventListener("click", () => {
                window.location.href = "updatebook.html";
            })
        );
    });
};

document.addEventListener("DOMContentLoaded", () => {
    changeResetVisibility("hide");
    bookArray = getFutureBooks();
    renderBooks(bookArray);
});

document.getElementById("add-book")?.addEventListener("click", () => {
    window.location.href = "newfuturebook.html";
});

