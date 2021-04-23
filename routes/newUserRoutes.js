const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get('/', (req,res) => {
    res.render('newUserReg', {title: 'User Registration'});
});

//save to the database  
router.post('/', (req,res) => {
    const registration = new Users(req.body);
    registration.save()
        .then(() => { res.redirect('/login') })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong');
            });
    });

// router.post('/', async (req,res) => {
//     try {
//         const registry = new Users(req.body);
//         await Users.register(registry, req.body.password, (err) => {
//             if (err)
//                 {
//                 throw err
//                 }    
//             res.redirect('/login')
//         })
//     }    
//     catch (err) {
//         res.status(400).send('Sorry! Something went wrong.')
//         console.log(err);
//         // res.send()
//         }
//     });

module.exports = router;