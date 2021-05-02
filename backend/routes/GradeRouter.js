const router = require('express').Router();
const auth = require('../middlewares/auth');
const Grade = require('../models/GradeModel');
const { ROLES } = require('../constants');
const Department = require('../models/DepartmentModel');
const Subject = require('../models/SubjectModel');
const User = require('../models/UserModel');

router.get('/', auth([ROLES.ADMIN]), async(req,res) => {
    try{
        const grades = await Grade.find();
        res.json(grades);
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/student-grades/:id',auth([ROLES.ADMIN,ROLES.TEACHER,ROLES.STUDENT]), async({params}, res) => {
   try{
       const studentDetails = await User.findOne({_id: params.id});
        const studentDepartment = await Department.findOne({_id: studentDetails.departmentID});
        const studentSubjects = await Subject.find({_id: {$in: [...studentDepartment.subjectIDS]}});
        const studentGrades = await Grade.find({
            studentID: params.id,
            subjectID: {$in: [...studentDepartment.subjectIDS]}
        });
        res.json(studentSubjects.map(({_id, name}) => ({
            id: _id,
            name,
            grades: [
                ...studentGrades.filter(({subjectID}) => subjectID.toString() === _id.toString()).map(({value, professorID}) => ({value}))
            ]
        })));
   } catch (e){
       res.status(400).json({message: e.message || 'Something went wrong'});
   }
});

router.post('/add', auth([ROLES.ADMIN, ROLES.TEACHER]), async ({body}, res) =>{
    try{
        const newGrade = await Grade({...body});
        const savedGrade = await newGrade.save();
        res.json({savedGrade});
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth([ROLES.ADMIN, ROLES.TEACHER]), async ({params}, res) => {
    try{
        await Grade.findOneAndDelete({_id: params.id || ''});
        res.json({message:'Grade deleted'});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;