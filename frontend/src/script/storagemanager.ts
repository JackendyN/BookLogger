import {  AnyBook, FutureBook } from "./bookinterfaces";

export const getBooks = (): AnyBook[] => {
    const books = localStorage.getItem("local-books");
    if (!books) return [];
    const parsedBooks = JSON.parse(books) || [];

    // Converting date objects
    parsedBooks.forEach((book: AnyBook) => {
        if (book.obtained === "bought") {
            book["date-bought"] = new Date(book["date-bought"]);
        } else {
            book["date-borrowed"] = new Date(book["date-borrowed"]);

            if (book["date-returned"]) {
                book["date-returned"] = new Date(book["date-returned"]);
            }
            if(book["date-due"]) {
                book["date-due"] = new Date(book["date-due"]);
            }
        }
    });

    return parsedBooks;
};

export const addBook = (book: AnyBook) => {
    let books = localStorage.getItem("local-books");
    let currentBooks;
    if(books) {
        currentBooks = JSON.parse(books)
    } else {
        currentBooks = [];
    }
    currentBooks.push(book);
    localStorage.setItem("local-books", JSON.stringify(currentBooks));
}