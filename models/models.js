const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    image: String   // image URL
});

module.exports = mongoose.model("Book", bookSchema);
