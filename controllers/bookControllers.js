const Book = require("../models/models");

// Show all books
exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.render("index", { books });
};

// Show add form
exports.addBookForm = (req, res) => {
    res.render("pages/addBook");
};

// Add book
exports.addBook = async (req, res) => {
    await Book.create(req.body);
    res.redirect("/");
};

// Show edit form
exports.editBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("edit", { book });
};

// Update book
exports.updateBook = async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
};

// Delete book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

