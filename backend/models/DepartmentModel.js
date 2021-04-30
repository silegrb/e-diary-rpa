const mongoose = require('mongoose');

const { Schema } = mongoose;

console.log('test');

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
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;