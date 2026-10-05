import { addFutureBook } from "./storagemanager.js";
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "wishlist.html";
});
const futureBookForm = document.getElementById("future-book-form");
futureBookForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(futureBookForm);
    const coverId = document.getElementById("cover").dataset.coverId;
    let obtained = formData.get("obtaining")?.toString();
    const location = formData.get("location");
    const newFutureBook = {
        "book-name": formData.get("book-name")?.toString() || "",
        "author-name": formData.get("author-name")?.toString() || "",
        cover: coverId,
        obtaining: obtained === "borrowing" ? "borrowing" : "owning",
        location: location?.toString()
    };
    addFutureBook(newFutureBook);
    alert(newFutureBook["book-name"] + " has been added to the wishlist!");
    window.location.href = "wishlist.html";
});
