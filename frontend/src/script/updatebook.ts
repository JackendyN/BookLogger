import { getBookByID, updateBook } from "./storagemanager.js";
import { getCover } from "./coverstorage.js";
import { hideInputs, showInputs } from "./bookform.js";
import { AnyBook, BoughtBook } from "./bookinterfaces.js";

let bookId: number;
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    bookId = Number(params.get("id"));
    if(!bookId) errorRedirect();
    const bookUpdating = getBookByID(bookId);
    if(!bookUpdating) {
        errorRedirect();
        return;
    }
    const updateForm = document.getElementById("update-form") as HTMLFormElement;
    if(!updateForm) errorRedirect();

    const nameField = document.getElementById("book-name") as HTMLInputElement;
    const authorField = document.getElementById("author-name") as HTMLInputElement;
    const readingCheck = document.getElementById("reading") as HTMLInputElement;
    const coverPreview = document.getElementById("cover-preview") as HTMLImageElement;
    nameField.value = bookUpdating["book-name"];
    authorField.value = bookUpdating["author-name"];
    readingCheck.checked = bookUpdating.reading;
    if(bookUpdating.cover) {
        const coverUrl = await getCover(bookUpdating.cover);
        coverPreview.src = coverUrl || "";
    }

    const borrowedValues = document.getElementById("borrowed-values");
    const boughtValues = document.getElementById("bought-values");
    const borrowElements = borrowedValues?.querySelectorAll("label");
    const boughtElements = boughtValues?.querySelectorAll("label");
    if(!borrowedValues || !boughtValues || !boughtElements || !borrowElements) {
        errorRedirect()
    } else {
        if(bookUpdating?.obtained === "bought") {
            borrowedValues.setAttribute("aria-hidden", "true");
            boughtValues.setAttribute("aria-hidden", "false");
            hideInputs(Array.from(borrowElements));
            showInputs(Array.from(boughtElements));

            const dateBoughtField = document.getElementById("date-bought") as HTMLInputElement;
            const boughtFromField = document.getElementById("bought-from") as HTMLInputElement;
            dateBoughtField.valueAsDate = bookUpdating["date-bought"];
            if(bookUpdating["bought-from"]) {
                boughtFromField.value = bookUpdating["bought-from"];
            }

        } else if(bookUpdating?.obtained === "borrowed") {
            borrowedValues.setAttribute("aria-hidden", "false");
            boughtValues.setAttribute("aria-hidden", "true");
            hideInputs(Array.from(boughtElements));
            showInputs(Array.from(borrowElements));

            const returnedField = document.getElementById("returned") as HTMLInputElement;
            const dateBorrowedField = document.getElementById("date-borrowed") as HTMLInputElement;
            const dateDueField = document.getElementById("date-due") as HTMLInputElement;
            const dateReturnedField = document.getElementById("date-returned") as HTMLInputElement;
            const borrowedFromField = document.getElementById("borrowed-from") as HTMLInputElement;
            returnedField.checked = bookUpdating.returned;
            dateReturnedField.valueAsDate = bookUpdating["date-borrowed"];
            if(bookUpdating["date-borrowed"]) {
                dateBorrowedField.valueAsDate = bookUpdating["date-borrowed"];
            }
            if(bookUpdating["date-due"]) {
                dateDueField.valueAsDate = bookUpdating["date-due"];
            }
            if(bookUpdating["borrowed-from"]) {
                borrowedFromField.value = bookUpdating["borrowed-from"];
            }
        }
    }
    
    updateForm.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        let updatedBook: AnyBook;
        const coverId = (
            document.getElementById("cover") as HTMLInputElement
        ).dataset.coverId;

        if(bookUpdating?.obtained === "bought") {
            updatedBook = {
                "book-id": bookId,
                "book-name": nameField.value,
                "author-name": authorField.value,
                reading: readingCheck.checked,
                cover: coverId || bookUpdating.cover,
                obtained: "bought",
                "date-bought": new Date((document.getElementById("date-bought") as HTMLInputElement).value),
                "bought-from": (document.getElementById("bought-from") as HTMLInputElement).value || "",
            }
        } else {
            updatedBook = {
                "book-id": bookId,
                "book-name": nameField.value,
                "author-name": authorField.value,
                reading: readingCheck.checked,
                cover: coverId || bookUpdating.cover,
                obtained: "borrowed",
                "date-borrowed": new Date((document.getElementById("date-borrowed") as HTMLInputElement).value),
                returned: (document.getElementById("returned") as HTMLInputElement).checked,
                "date-due": (document.getElementById("date-due") as HTMLInputElement).valueAsDate || undefined,
                "date-returned": (document.getElementById("date-returned") as HTMLInputElement).valueAsDate || undefined,
                "borrowed-from": (document.getElementById("borrowed-from") as HTMLInputElement).value,
            }
        }

        if(updateBook(bookId, updatedBook)) {
            alert(`${bookUpdating["book-name"]} has been updated.`);
            window.location.href = "books.html";
        } else {
            alert("Something went wrong. Please try again.")
        }

    });
    
});

const errorRedirect = () => {
    alert("Something went wrong. Try again later.");
    window.location.href = "books.html";
}