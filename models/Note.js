const mongoose = require("mongoose")

// Save a reference to the Schema constructor
const Schema = mongoose.Schema

// Creates a new NoteSchema object
const NoteSchema = new Schema({
    title: String,
    body: String
})

// Creates our model from the schema, uses the mongoose method
var Note = mongoose.model("Note", NoteSchema)

// Export the Note model
module.exports = Note