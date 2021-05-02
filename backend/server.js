const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, ATLAS_URI } = require('./config');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('mongodb-connection-established');
});

const UserRouter = require('./routes/UserRoutes');
const AuthRouter = require('./routes/AuthRoutes');
const DepartmentRouter = require('./routes/DepartmentRoutes');
const SubjectRouter = require('./routes/SubjectRoutes');
const GradeRouter = require('./routes/GradeRouter');

app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/departments', DepartmentRouter);
app.use('/subjects', SubjectRouter);
app.use('/grades', GradeRouter);

app.listen(PORT || 5000, () => {
    console.log(`server_running-port-${PORT || 5000}`);
});