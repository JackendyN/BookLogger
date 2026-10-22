import { getFutureBookByID, updateFutureBook, deleteFutureBook } from "./storagemanager.js";
import { getCover, deleteCover } from "./coverstorage.js";
import { FutureBook } from "./bookinterfaces.js";

let bookId: number;
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    bookId = Number(params.get("id"));
    if(!bookId) errorRedirect();
    const bookUpdating = getFutureBookByID(bookId);
    if(!bookUpdating) {
        errorRedirect();
        return;
    }
    const updateForm = document.getElementById("future-update-form") as HTMLFormElement;
    if(!updateForm) errorRedirect();

    const nameField = document.getElementById("book-name") as HTMLInputElement;
    const authorField = document.getElementById("author-name") as HTMLInputElement;
    const coverPreview = document.getElementById("cover-preview") as HTMLImageElement;
    const locationField = document.getElementById("location") as HTMLInputElement;
    nameField.value = bookUpdating["book-name"];
    authorField.value = bookUpdating["author-name"];
    if(bookUpdating.cover) {
        const coverUrl = await getCover(bookUpdating.cover);
        coverPreview.src = coverUrl || "";
    }
    if(bookUpdating.location) {
        locationField.value = bookUpdating.location;
    }

    updateForm.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const coverId = (
            document.getElementById("cover") as HTMLInputElement
        ).dataset.coverId;
        const updatedBook: FutureBook = {
            "book-id": bookId,
            "book-name": nameField.value,
            "author-name": authorField.value,
            cover: coverId || bookUpdating.cover,
            obtaining: bookUpdating.obtaining,
            location: locationField.value || "",
        };
        if(updateFutureBook(bookId, updatedBook)) {
            alert(`${bookUpdating["book-name"]} has been updated.`);
            window.location.href = "wishlist.html";
        } else {
            alert("Something went wrong. Please try again.")
        }
    });

    const removeButton = document.getElementById("remove-book");
    removeButton?.addEventListener("click", async () => {
        if(window.confirm("Are you SURE you want to remove this book?")) {
            if(deleteFutureBook(bookId)) {
                if(bookUpdating.cover) {
                    if(await deleteCover(bookUpdating.cover)) {
                        console.log("Cover has also been deleted.")
                    } else {
                        console.log("Cover could not be deleted.")
                    }
                }
                alert(`${bookUpdating["book-name"]} has been removed.`);
                window.location.href = "wishlist.html";
            } else {
                alert("Something went wrong. The book was not deleted.")
            }
        }
    });
});

const errorRedirect = () => {
    alert("Something went wrong. Try again later.");
    window.location.href = "wishlist.html";
}