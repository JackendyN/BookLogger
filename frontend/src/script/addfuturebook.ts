import { FutureBook } from "./bookinterfaces";
import { addFutureBook } from "./storagemanager.js";

document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "wishlist.html";
});

const futureBookForm = document.getElementById("future-book-form") as HTMLFormElement;
futureBookForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(futureBookForm);
    const coverId = (
        document.getElementById("cover") as HTMLInputElement
    ).dataset.coverId;
    let obtained = formData.get("obtaining")?.toString();
    const location = formData.get("location");
    const newFutureBook: FutureBook = {
        "book-name": formData.get("book-name")?.toString() || "",
        "author-name": formData.get("author-name")?.toString() || "",
        cover: coverId,
        obtaining: obtained === "borrowing" ? "borrowing" : "owning",
        location: location?.toString()
    };
    addFutureBook(newFutureBook);
    alert(newFutureBook["book-name"] + " has been added to the wishlist!")
    window.location.href = "wishlist.html";
});