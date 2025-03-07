import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// File to store books
const BOOKS_FILE = 'books.txt';

// Adds a book to books.txt
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body; // Extract book details 

    // Validate input fields so that no field is empty
    if (!bookName || !isbn || !author || !yearPublished) {
        return res.send({ success: false });
    }

    // Format book entry
    const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;

    // Append to books.txt
    fs.appendFile(BOOKS_FILE, bookEntry, (err) => {
        if (err) {
            return res.send({ success: false });
        }
        res.send({ success: true });
    });
});

// Finds a book by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;

    // If isbn or author is missing, return empty array
    if (!isbn || !author) {
        return res.send([]);
    }

    // Read books file
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.send([]);
        }

        // Convert books to array of lines
        const books = data.trim().split('\n');
        const results = books.filter(line => {
            // Split each line 
            const [name, bookIsbn, bookAuthor, year] = line.split(',');
            return bookIsbn === isbn && bookAuthor === author;
        });

        res.send(results);
    });
});

// Finds books by Author
app.get('/find-by-author', (req, res) => {
    const { author } = req.query;

    // If no author, return empty array
    if (!author) {
        return res.send([]);
    }

    // Read books.txt to search for books of the author
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.send([]);
        }

        const books = data.trim().split('\n');
        const results = books.filter(line => {
            // Extract book details
            const [name, bookIsbn, bookAuthor, year] = line.split(',');
            return bookAuthor === author;
        });

        res.send(results);
    });
});

app.listen(3000, () => { console.log('Server started at port 3000')} );