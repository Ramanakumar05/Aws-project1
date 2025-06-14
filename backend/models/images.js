const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    // mongoose.Schema.Types.ObjectId -"This field will store a reference to another document in a different collection."    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
