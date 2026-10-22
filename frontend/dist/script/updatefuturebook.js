import { getFutureBookByID, updateFutureBook } from "./storagemanager.js";
import { getCover } from "./coverstorage.js";
let bookId;
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    bookId = Number(params.get("id"));
    if (!bookId)
        errorRedirect();
    const bookUpdating = getFutureBookByID(bookId);
    if (!bookUpdating) {
        errorRedirect();
        return;
    }
    const updateForm = document.getElementById("future-update-form");
    if (!updateForm)
        errorRedirect();
    const nameField = document.getElementById("book-name");
    const authorField = document.getElementById("author-name");
    const coverPreview = document.getElementById("cover-preview");
    const locationField = document.getElementById("location");
    nameField.value = bookUpdating["book-name"];
    authorField.value = bookUpdating["author-name"];
    if (bookUpdating.cover) {
        const coverUrl = await getCover(bookUpdating.cover);
        coverPreview.src = coverUrl || "";
    }
    if (bookUpdating.location) {
        locationField.value = bookUpdating.location;
    }
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const coverId = document.getElementById("cover").dataset.coverId;
        const updatedBook = {
            "book-id": bookId,
            "book-name": nameField.value,
            "author-name": authorField.value,
            cover: coverId || bookUpdating.cover,
            obtaining: bookUpdating.obtaining,
            location: locationField.value || "",
        };
        if (updateFutureBook(bookId, updatedBook)) {
            alert(`${bookUpdating["book-name"]} has been updated.`);
            window.location.href = "wishlist.html";
        }
        else {
            alert("Something went wrong. Please try again.");
        }
    });
});
const errorRedirect = () => {
    alert("Something went wrong. Try again later.");
    window.location.href = "wishlist.html";
};
