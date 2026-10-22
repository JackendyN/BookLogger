import { getBookByID, updateBook, deleteBook } from "./storagemanager.js";
import { getCover, deleteCover } from "./coverstorage.js";
import { hideInputs, showInputs } from "./bookform.js";
let bookId;
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    bookId = Number(params.get("id"));
    if (!bookId)
        errorRedirect();
    const bookUpdating = getBookByID(bookId);
    if (!bookUpdating) {
        errorRedirect();
        return;
    }
    const updateForm = document.getElementById("update-form");
    if (!updateForm)
        errorRedirect();
    const nameField = document.getElementById("book-name");
    const authorField = document.getElementById("author-name");
    const readingCheck = document.getElementById("reading");
    const coverPreview = document.getElementById("cover-preview");
    nameField.value = bookUpdating["book-name"];
    authorField.value = bookUpdating["author-name"];
    readingCheck.checked = bookUpdating.reading;
    if (bookUpdating.cover) {
        const coverUrl = await getCover(bookUpdating.cover);
        coverPreview.src = coverUrl || "";
    }
    const borrowedValues = document.getElementById("borrowed-values");
    const boughtValues = document.getElementById("bought-values");
    const borrowElements = borrowedValues?.querySelectorAll("label");
    const boughtElements = boughtValues?.querySelectorAll("label");
    if (!borrowedValues || !boughtValues || !boughtElements || !borrowElements) {
        errorRedirect();
    }
    else {
        if (bookUpdating?.obtained === "bought") {
            borrowedValues.setAttribute("aria-hidden", "true");
            boughtValues.setAttribute("aria-hidden", "false");
            hideInputs(Array.from(borrowElements));
            showInputs(Array.from(boughtElements));
            const dateBoughtField = document.getElementById("date-bought");
            const boughtFromField = document.getElementById("bought-from");
            dateBoughtField.valueAsDate = bookUpdating["date-bought"];
            if (bookUpdating["bought-from"]) {
                boughtFromField.value = bookUpdating["bought-from"];
            }
        }
        else if (bookUpdating?.obtained === "borrowed") {
            borrowedValues.setAttribute("aria-hidden", "false");
            boughtValues.setAttribute("aria-hidden", "true");
            hideInputs(Array.from(boughtElements));
            showInputs(Array.from(borrowElements));
            const returnedField = document.getElementById("returned");
            const dateBorrowedField = document.getElementById("date-borrowed");
            const dateDueField = document.getElementById("date-due");
            const dateReturnedField = document.getElementById("date-returned");
            const borrowedFromField = document.getElementById("borrowed-from");
            returnedField.checked = bookUpdating.returned;
            dateReturnedField.valueAsDate = bookUpdating["date-borrowed"];
            if (bookUpdating["date-borrowed"]) {
                dateBorrowedField.valueAsDate = bookUpdating["date-borrowed"];
            }
            if (bookUpdating["date-due"]) {
                dateDueField.valueAsDate = bookUpdating["date-due"];
            }
            if (bookUpdating["borrowed-from"]) {
                borrowedFromField.value = bookUpdating["borrowed-from"];
            }
        }
    }
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let updatedBook;
        const coverId = document.getElementById("cover").dataset.coverId;
        if (bookUpdating?.obtained === "bought") {
            updatedBook = {
                "book-id": bookId,
                "book-name": nameField.value,
                "author-name": authorField.value,
                reading: readingCheck.checked,
                cover: coverId || bookUpdating.cover,
                obtained: "bought",
                "date-bought": new Date(document.getElementById("date-bought").value),
                "bought-from": document.getElementById("bought-from").value || "",
            };
        }
        else {
            updatedBook = {
                "book-id": bookId,
                "book-name": nameField.value,
                "author-name": authorField.value,
                reading: readingCheck.checked,
                cover: coverId || bookUpdating.cover,
                obtained: "borrowed",
                "date-borrowed": new Date(document.getElementById("date-borrowed").value),
                returned: document.getElementById("returned").checked,
                "date-due": document.getElementById("date-due").valueAsDate || undefined,
                "date-returned": document.getElementById("date-returned").valueAsDate || undefined,
                "borrowed-from": document.getElementById("borrowed-from").value,
            };
        }
        if (updateBook(bookId, updatedBook)) {
            alert(`${bookUpdating["book-name"]} has been updated.`);
            window.location.href = "books.html";
        }
        else {
            alert("Something went wrong. Please try again.");
        }
    });
    const removeButton = document.getElementById("remove-book");
    removeButton?.addEventListener("click", async () => {
        if (window.confirm("Are you SURE you want to remove this book?")) {
            if (deleteBook(bookId)) {
                if (bookUpdating.cover) {
                    if (await deleteCover(bookUpdating.cover)) {
                        console.log("Cover has also been deleted.");
                    }
                    else {
                        console.log("Cover could not be deleted.");
                    }
                }
                alert(`${bookUpdating["book-name"]} has been removed.`);
                window.location.href = "books.html";
            }
            else {
                alert("Something went wrong. The book was not deleted.");
            }
        }
    });
});
const errorRedirect = () => {
    alert("Something went wrong. Try again later.");
    window.location.href = "books.html";
};
