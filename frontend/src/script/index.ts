document.querySelector("#guest")?.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("guest", "true");
    window.location.href = "home.html";
});

const loginButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
        '#login-form button:not(#login-form button[id="guest"])'))
loginButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", (e) => e.preventDefault());
})

document.addEventListener("DOMContentLoaded", () => {
    const futureBooks = [
    {
        "book-name": "The Silmarillion",
        "author-name": "J.R.R. Tolkien",
        cover: "https://covers.openlibrary.org/b/isbn/9780618391110-L.jpg",
        obtaining: "owning",
        location: "Barnes & Noble"
    },
    {
        "book-name": "The Way of Kings",
        "author-name": "Brandon Sanderson",
        cover: "https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg",
        obtaining: "borrowing",
        location: "City Library"
    },
    {
        "book-name": "Neuromancer",
        "author-name": "William Gibson",
        cover: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg",
        obtaining: "owning",
        location: "Amazon"
    },
    {
        "book-name": "The Once and Future King",
        "author-name": "T.H. White",
        cover: "https://covers.openlibrary.org/b/isbn/9780441627401-L.jpg",
        obtaining: "borrowing",
        location: "School Library"
    },
    {
        "book-name": "The Count of Monte Cristo",
        "author-name": "Alexandre Dumas",
        cover: "https://covers.openlibrary.org/b/isbn/9780553897845-L.jpg",
        obtaining: "owning",
        location: "Half Price Books"
    },
    {
        "book-name": "The Left Hand of Darkness",
        "author-name": "Ursula K. Le Guin",
        cover: "https://covers.openlibrary.org/b/isbn/9780441478125-L.jpg",
        obtaining: "borrowing",
        location: "Jordan"
    },
    {
        "book-name": "The Brothers Karamazov",
        "author-name": "Fyodor Dostoevsky",
        obtaining: "owning"
    },
    {
        "book-name": "The Ocean at the End of the Lane",
        "author-name": "Neil Gaiman",
        cover: "https://covers.openlibrary.org/b/isbn/9780062459367-L.jpg",
        obtaining: "borrowing",
        location: "Emily"
    },
    {
        "book-name": "The Priory of the Orange Tree",
        "author-name": "Samantha Shannon",
        cover: "https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg",
        obtaining: "owning",
        location: "Local Bookstore"
    },
    {
        "book-name": "Good Omens",
        "author-name": "Neil Gaiman and Terry Pratchett",
        cover: "https://covers.openlibrary.org/b/isbn/9780060853983-L.jpg",
        obtaining: "borrowing",
        location: "Sam"
    },
    {
        "book-name": "The Invisible Life of Addie LaRue",
        "author-name": "V.E. Schwab",
        cover: "https://covers.openlibrary.org/b/isbn/9780765387561-L.jpg",
        obtaining: "owning",
        location: "Target"
    },
    {
        "book-name": "A Wizard of Earthsea",
        "author-name": "Ursula K. Le Guin",
        cover: "https://covers.openlibrary.org/b/isbn/9780547722023-L.jpg",
        obtaining: "borrowing",
        location: "City Library"
    },
    {
        "book-name": "The Name of the Rose",
        "author-name": "Umberto Eco",
        obtaining: "owning",
        location: "ThriftBooks"
    },
    {
        "book-name": "The Shadow of the Wind",
        "author-name": "Carlos Ruiz Zafón",
        cover: "https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg",
        obtaining: "borrowing",
        location: "Alex"
    },
    {
        "book-name": "The Lies of Locke Lamora",
        "author-name": "Scott Lynch",
        cover: "https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg",
        obtaining: "owning",
        location: "Barnes & Noble"
    }
    ];
    window.localStorage.setItem("future-local-books", JSON.stringify(futureBooks));
})