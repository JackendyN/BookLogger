export const addBook = (book) => {
    let books = localStorage.getItem("local-books");
    let currentBooks;
    if (books) {
        currentBooks = JSON.parse(books);
    }
    else {
        currentBooks = [];
    }
    currentBooks.push(book);
    localStorage.setItem("local-books", JSON.stringify(currentBooks));
};
export const addFutureBook = (book) => {
    let books = localStorage.getItem("future-local-books");
    let currentBooks;
    currentBooks = books ? JSON.parse(books) : [];
    currentBooks.push(book);
    localStorage.setItem("future-local-books", JSON.stringify(currentBooks));
};
export const nextID = (bookType) => {
    const books = bookType === 0 ? getBooks() : getFutureBooks();
    if (books.length === 0)
        return 1;
    return books[books.length - 1]["book-id"] + 1;
};
export const getBooks = () => {
    const books = localStorage.getItem("local-books");
    if (!books)
        return [];
    const parsedBooks = JSON.parse(books) || [];
    // Converting date objects
    parsedBooks.forEach((book) => {
        if (book.obtained === "bought") {
            book["date-bought"] = new Date(book["date-bought"]);
        }
        else {
            book["date-borrowed"] = new Date(book["date-borrowed"]);
            if (book["date-returned"]) {
                book["date-returned"] = new Date(book["date-returned"]);
            }
            if (book["date-due"]) {
                book["date-due"] = new Date(book["date-due"]);
            }
        }
    });
    return parsedBooks;
};
export const getFutureBooks = () => {
    const books = localStorage.getItem("future-local-books");
    if (!books)
        return [];
    const parsedBooks = JSON.parse(books) || [];
    return parsedBooks;
};
export const getBookByID = (givenID) => {
    const books = getBooks();
    const foundBook = books.find((book) => book["book-id"] === givenID);
    if (!foundBook)
        return undefined;
    return foundBook;
};
export const getFutureBookByID = (givenID) => {
    const books = getFutureBooks();
    const foundBook = books.find((book) => book["book-id"] === givenID);
    if (!foundBook)
        return undefined;
    return foundBook;
};
export const updateBook = (id, updatedBook) => {
    const bookArray = getBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if (!currentBook)
        return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if (currentBookIndex === -1)
        return false;
    bookArray.splice(currentBookIndex, 1, updatedBook);
    localStorage.setItem("local-books", JSON.stringify(bookArray));
    return true;
};
export const updateFutureBook = (id, updatedBook) => {
    const bookArray = getFutureBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if (!currentBook)
        return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if (currentBookIndex === -1)
        return false;
    bookArray.splice(currentBookIndex, 1, updatedBook);
    localStorage.setItem("future-local-books", JSON.stringify(bookArray));
    return true;
};
export const deleteBook = (id) => {
    const bookArray = getBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if (!currentBook)
        return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if (currentBookIndex === -1)
        return false;
    bookArray.splice(currentBookIndex, 1);
    localStorage.setItem("local-books", JSON.stringify(bookArray));
    return true;
};
export const deleteFutureBook = (id) => {
    const bookArray = getFutureBooks();
    const currentBook = bookArray.find((book) => book["book-id"] === id);
    if (!currentBook)
        return false;
    const currentBookIndex = bookArray.indexOf(currentBook);
    if (currentBookIndex === -1)
        return false;
    bookArray.splice(currentBookIndex, 1);
    localStorage.setItem("future-local-books", JSON.stringify(bookArray));
    return true;
};
