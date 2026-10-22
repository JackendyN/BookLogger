import { saveCover, deleteCover } from "./coverstorage.js";
export const hideInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = true;
        }
    });
};
export const showInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = false;
        element.setAttribute("aria-hidden", "false");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = false;
        }
    });
};
const imageInput = document.getElementById("cover");
imageInput?.addEventListener("change", async () => {
    const imageFile = imageInput.files?.[0];
    if (!imageFile)
        return;
    if (!imageFile.type.startsWith("image/")) {
        imageInput.value = "";
        alert("Please select an image.");
        return;
    }
    const imagePreview = document.getElementById("cover-preview");
    if (!imagePreview)
        return;
    const coverId = crypto.randomUUID();
    await saveCover(coverId, imageFile);
    imagePreview.src = URL.createObjectURL(imageFile);
    imageInput.dataset.coverId = coverId;
});
document.getElementById("back")?.addEventListener("click", async () => {
    if (imageInput.dataset.coverId) {
        await deleteCover(imageInput.dataset.coverId);
    }
    if (window.location.href.includes("newbook.html")
        || window.location.href.includes("updatebook.html")) {
        window.location.href = "books.html";
    }
    else if (window.location.href.includes("newfuturebook.html")
        || window.location.href.includes("updatefuturebook.html")) {
        window.location.href = "wishlist.html";
    }
    else {
        window.location.href = "home.html";
    }
});
