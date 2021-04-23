const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('customerList', {tilte: 'Customer List'});
});



module.exports = router;