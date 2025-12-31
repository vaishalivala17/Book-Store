const express = require("express");
const router = express.Router();
const Book = require("../models/models");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// SHOW BOOKS
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.render("index", { books });
});

// ADD BOOK
router.get("/addBook", (req, res) => {
    res.render("pages/addBook");
});

router.post("/addBook", upload.single("image"), async (req, res) => {
    await Book.create({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        image: req.file.filename
    });
    res.redirect("/");
});

router.get("/editBook/:id", async (req, res) => {
    res.render("pages/editBook", {
        book: await Book.findById(req.params.id)
    });
});

router.post("/editBook/:id", upload.single("image"), async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        ...(req.file && { image: req.file.filename })
    });
    res.redirect("/");
});

// DELETE BOOK
router.get("/deleteBook/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book.image && fs.existsSync("uploads/" + book.image)) {
        fs.unlinkSync("uploads/" + book.image);
    }

    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;
