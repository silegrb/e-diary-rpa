const mongoose = require('mongoose');

const { Schema } = mongoose;

const gradeSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    subjectID: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    professorID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gradedBy: {
        type: Schema.Types.String,
        required: true
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;