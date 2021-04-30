const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const User = require('../models/UserModel');

router.get('/', auth(['ROLE_ADMIN']), async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/create',  auth(['ROLE_ADMIN']), async({body}, res) => {
    try {
        const newUser = new User({...body});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);

        newUser.password = hash;
        const savedUser = await newUser.save();
        savedUser.password = null;
        res.json({savedUser});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:username',  auth(['ROLE_ADMIN']), async ({params}, res) => {
    try{
        await User.findOneAndDelete({username: params.username || ''});
        res.json({message:'User deleted'});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
})

module.exports = router;