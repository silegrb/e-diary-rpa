const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/UserModel');

router.post('/login', async ({body}, res) => {

    try{
        const {username, password} = body;
        if(!username || !password) return res.status(400).json({message: 'Empty fields'});
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.status(400).json({message: 'Invalid credentials'});
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: 604800 });
        if(!token) return res.status(400).json({message: 'Something went wrong'});
        user.password = null;
        res.json({user, token});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }

});

module.exports = router;