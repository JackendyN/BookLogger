import { addBook } from "./storagemanager.js";
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html";
});
const hideInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = true;
        }
    });
};
const showInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = false;
        element.setAttribute("aria-hidden", "false");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = false;
        }
    });
};
const obtainSelect = document.getElementById("obtain-select");
const borrowedValues = document.getElementById("borrowed-values");
const boughtValues = document.getElementById("bought-values");
obtainSelect.addEventListener("change", () => {
    if (!borrowedValues || !boughtValues)
        return;
    const borrowElements = borrowedValues.querySelectorAll("label");
    const boughtElements = boughtValues.querySelectorAll("label");
    if (obtainSelect.value === "bought") {
        borrowedValues.setAttribute("aria-hidden", "true");
        boughtValues.setAttribute("aria-hidden", "false");
        hideInputs(Array.from(borrowElements));
        showInputs(Array.from(boughtElements));
    }
    else if (obtainSelect.value === "borrowed") {
        borrowedValues.setAttribute("aria-hidden", "false");
        boughtValues.setAttribute("aria-hidden", "true");
        hideInputs(Array.from(boughtElements));
        showInputs(Array.from(borrowElements));
    }
});
const bookForm = document.getElementById("book-form");
bookForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let newBook;
    const formData = new FormData(bookForm);
    const bookInformation = {
        name: formData.get("book-name")?.toString(),
        author: formData.get("author-name")?.toString(),
        isReading: Boolean(formData.get("reading")),
        obtained: formData.get("obtained")?.toString(),
    };
    const coverId = document.getElementById("cover").dataset.coverId;
    if (coverId) {
        bookInformation.cover = coverId;
    }
    if (bookInformation.obtained == "borrowed") {
        bookInformation.dateBorrowed = formData.get("date-borrowed")?.toString();
        bookInformation.returned = Boolean(formData.get("returned"));
        const dateDue = formData.get("date-due")?.toString();
        if (dateDue) {
            bookInformation.dateDue = dateDue;
        }
        const dateReturned = formData.get("date-returned")?.toString();
        if (dateReturned) {
            bookInformation.dateReturned = dateReturned;
        }
        const borrowedFrom = formData.get("borrowed-from")?.toString();
        if (borrowedFrom) {
            bookInformation.borrowedFrom = borrowedFrom;
        }
        newBook = {
            "book-name": bookInformation.name || "",
            "author-name": bookInformation.author || "",
            reading: bookInformation.isReading || false,
            obtained: "borrowed",
            cover: bookInformation.cover,
            "date-borrowed": new Date(bookInformation.dateBorrowed),
            returned: bookInformation.returned,
            "date-due": new Date(bookInformation.dateDue),
            "date-returned": new Date(bookInformation.dateReturned),
            "borrowed-from": bookInformation.borrowedFrom,
        };
    }
    else if (bookInformation.obtained == "bought") {
        bookInformation.dateBought = formData.get("date-bought")?.toString();
        const boughtFrom = formData.get("borrowed-from")?.toString();
        if (boughtFrom) {
            bookInformation.boughtFrom = boughtFrom;
        }
        newBook = {
            "book-name": bookInformation.name || "",
            "author-name": bookInformation.author || "",
            reading: bookInformation.isReading || false,
            obtained: "bought",
            cover: bookInformation.cover,
            "date-bought": new Date(bookInformation.dateBought),
            "bought-from": bookInformation.boughtFrom,
        };
    }
    else {
        console.log("Something went wrong.");
        return;
    }
    addBook(newBook);
    alert(bookInformation.name + " has been added to the local book collection!");
    window.location.href = "books.html";
});
