import { saveCover } from "./coverstorage.js";
const imageInput = document.getElementById("cover");
imageInput.addEventListener("change", async () => {
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
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html";
});
