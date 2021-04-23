const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders')

// router.get('/', (req,res) => {
//     res.render('orders', {title: 'Orders'});
// });

router.get('/serviceOrder', (req,res) => {
    res.render('serviceOrder', {title: 'New Order'});
});

router.post('/serviceOrders', async (req,res) => {
    try{
        const ord = new Orders(req.body);
        await ord.save()
        res.redirect('/orders')
    }catch(err){
        console.log(err);
        res.send('Sorry! Something went wrong.')
    }
});

router.get('/', async (req,res) => {
    try{
        let service = await Orders.find();
        if (req.query.accountType) {
            service = await Orders.find({ accountType: req.query.accountType})
        }
        res.render('orders', {parks: service, title: 'Orders'});
    }catch(err) {
        res.send('Process failed! No orders loaded');
    }
});


module.exports = router;