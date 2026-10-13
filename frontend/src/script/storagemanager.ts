import {  AnyBook, FutureBook } from "./bookinterfaces";

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

export const addFutureBook = (book: FutureBook) => {
    let books = localStorage.getItem("future-local-books");
    let currentBooks;
    currentBooks = books ? JSON.parse(books) : [];
    currentBooks.push(book);
    localStorage.setItem("future-local-books", JSON.stringify(currentBooks));
}

export const nextID = (bookType: number): number => { // 0 = Current, 1 = Future
    const books = bookType === 0 ? getBooks() : getFutureBooks();
    if(books.length === 0) return 1;
    return books[books.length - 1]["book-id"] + 1;
}

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

export const getFutureBooks = (): FutureBook[] => {
    const books = localStorage.getItem("future-local-books");
    if (!books) return [];
    const parsedBooks = JSON.parse(books) || [];
    return parsedBooks;
}

export const getBookByID = (givenID: Number) => {
    const books = getBooks();
    const foundBook = books.find((book) => book["book-id"] === givenID);
    if(!foundBook) return undefined;
    return foundBook;
}

export const getFutureBookByID = (givenID: Number) => {
    const books = getFutureBooks();
    const foundBook = books.find((book) => book["book-id"] === givenID);
    if(!foundBook) return undefined;
    return foundBook;
}

export const updateBook = (id: Number, updatedBook: AnyBook): boolean => {
    const bookArray = getBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if(!currentBook) return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if(currentBookIndex === -1) return false;
    bookArray.splice(currentBookIndex, 1, updatedBook);
    localStorage.setItem("local-books", JSON.stringify(bookArray));
    return true;
}

export const updateFutureBook = (id: Number, updatedBook: FutureBook): boolean => {
    const bookArray = getFutureBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if(!currentBook) return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if(currentBookIndex === -1) return false;
    bookArray.splice(currentBookIndex, 1, updatedBook);
    localStorage.setItem("local-books", JSON.stringify(bookArray));
    return true;
}