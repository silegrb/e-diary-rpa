const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    professorIDS: {
        type: Array,
    },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;