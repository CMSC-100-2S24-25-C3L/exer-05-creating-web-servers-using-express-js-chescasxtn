import needle from 'needle';

const BASE_URL = 'http://localhost:3000';

// List of books
const books = [
    {
        bookName: "Harry Potter and the Philosopher’s Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        yearPublished: "1997"
    },
    {
        bookName: "Harry Potter and the Chamber of Secrets",
        isbn: "0-7475-3849-2",
        author: "J.K Rowling",
        yearPublished: "1998"
    },
    {
        bookName: "The Little Prince",
        isbn: "978-0156012195",
        author: "Antoine Saint-Exupery",
        yearPublished: "1943"
    }
];

// Function to add all books
const addBooks = async () => {
    for (const book of books) { // Loop through each book
        await new Promise((resolve) => { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
            // Sends a POST request to add book
            needle.post(`${BASE_URL}/add-book`, book, { json: true }, (err, res) => {
                if (err) {
                    console.error(`ERROR adding book "${book.bookName}":`, err);
                } else {
                    console.log(`Added: ${book.bookName} ->`, res.body);
                }
                resolve(); // Move to next book if done
            });
        });
    }
};

// Function to find a book by ISBN and Author 
const findBookByISBNAndAuthor = () => {
    // Send GET request to retrieve book by ISBN and author
    needle.get(url, (err, res) => {
        if (err) {
            console.error('ERROR finding book by ISBN and author:', err);
        } else {
            console.log(`ISBN & Author (${book.bookName})`, res.body);
        }
    });
};

// Function to find books by Author 
const findBooksByAuthor = () => {
    // Send GET request to retrieve book by author
    needle.get(url, (err, res) => {
        if (err) {
            console.error('ERROR finding books by author:', err);
        } else {
            console.log(`Author (${author})`, res.body);
        }
    });
};

// Run the test
addBooks();
