const router = require('express').Router();
const auth = require('../middlewares/auth');
const Department = require('../models/DepartmentModel');
const User = require('../models/UserModel');
const Grade = require('../models/GradeModel')
const Subject = require('../models/SubjectModel');
const { ROLES } = require('../constants');
const { roundToTwoDecimals } = require('../utils/calculations');

router.get('/', auth([ROLES.ADMIN, ROLES.TEACHER]), async({user},res) => {
    try{
        let departments = await Department.find();
        if(user.role === ROLES.TEACHER){
            const professorSubjects = await Subject.find({professorIDS: user.id});
            departments = departments.filter(({subjectIDS}) => !!professorSubjects.find(({_id}) => subjectIDS.includes(_id)));
        }
        res.json(departments);
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/:id', auth([ROLES.ADMIN, ROLES.TEACHER]), async ({params},res) => {
    try{
        let {name, class: departmentClass, _id} = await Department.findById(params.id);
        let departmentsStudents = await User.find({role: ROLES.STUDENT, departmentID: _id});
        const grades = await Grade.find({studentID: {$in: [...departmentsStudents.map(({_id}) => _id)]}});
        departmentsStudents = [...departmentsStudents.map(({_id, name, surname, username}) => {
            const departmentStudentGrades = grades.filter(({studentID}) => studentID.toString() === _id.toString());
            const gradeAverageSum = departmentStudentGrades.reduce((acc, {value}) => acc + value, 0);
            const gradeAverage = !!departmentStudentGrades.length ? roundToTwoDecimals(gradeAverageSum / departmentStudentGrades.length) : 0;
            return {
                id: _id,
                username,
                name,
                surname,
                gradeAverage
            };
        })];
        res.json({
            id: _id,
            name,
            class: departmentClass,
            students: departmentsStudents,
        });
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/add', auth([ROLES.ADMIN]), async ({body}, res) =>{
    try{
        const newDepartment = await Department({...body});
        const savedDepartment = await newDepartment.save();
        res.json({savedDepartment});
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth([ROLES.ADMIN]), async ({params}, res) => {
    try{
        await Department.findOneAndDelete({_id: params.id || ''});
        res.json({message:'Department deleted'});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;