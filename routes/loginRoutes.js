const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req,res) => {
    res.render('login', {title: 'Login'});
});


//To check username and password (passport)
router.post('/', passport.authenticate('local', {failureRedirect: '/login'}), (req,res) => {
    req.session.user = req.user;
    res.redirect('/employee');
});

// router.get('/', (req,res) => {
//     if (req.session) {
//         req.session.destroy(err => {
//             if (err) {
//                 res.status(400).send('Unable to logout');
//             }else {
//                 res.logout();
//                 res.redirect('/')
//             }
//         });
//     }
// });

module.exports = router;