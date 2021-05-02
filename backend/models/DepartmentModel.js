const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: Number,
        required: true,
    },
    subjectIDS: {
        type: Array,
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;