let mongoose = require('mongoose');
let userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        date: String,
        imagePath: String,
        latitude: String,
        longitude: String,
        location: String,
        comments: String
    })

const postModel = new mongoose.model("sighting_details", userSchema)
module.exports = postModel