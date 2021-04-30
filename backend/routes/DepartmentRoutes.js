const router = require('express').Router();
const auth = require('../middlewares/auth');
const Department = require('../models/DepartmentModel');

router.get('/', auth(['ROLE_TEACHER', 'ROLE_ADMIN']), async(req,res) => {
    try{
        const departments = await Department.find();
        res.json(departments);
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/add', auth(['ROLE_ADMIN']), async ({body}, res) =>{
    try{
        const newDepartment = await Department({...body});
        const savedDepartment = await newDepartment.save();
        res.json({savedDepartment});
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth(['ROLE_ADMIN']), async ({params}, res) => {
    try{
        await Department.findOneAndDelete({_id: params.id || ''});
        res.json({message:'Department deleted'});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;