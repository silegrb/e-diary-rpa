const { ROLES } = require('../constants');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const Subject = require('../models/SubjectModel');

router.get('/', auth(['ROLE_ADMIN', 'ROLE_TEACHER']), async({user},res) =>{
    try{
        let subjects;
        if(user.role === ROLES.TEACHER){
            subjects = await Subject.find({professorIDS: user.id});
        }
        else {
            subjects = await Subject.find();
        }
        res.json(subjects);
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/', auth(['ROLE_ADMIN']), async({body},res) => {
    try{
        const newSubject = await Subject({...body});
        const savedSubject = await newSubject.save();
        res.json({savedSubject});
    }catch(e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth(['ROLE_ADMIN']), async ({params}, res) => {
    try{
        await Subject.findOneAndDelete({_id: params.id || ''});
        res.json({message:'Subject deleted'});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;