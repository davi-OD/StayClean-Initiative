const express = require('express');
const router = express.Router();
const Trucks = require('../models/Trucks')


// router.get('/', (req,res) => {
//     res.render('trucks', {title: 'Trucks List'});
// });

router.get('/trucksReg', (req,res) => {
    res.render('trucksReg', {title: 'Trucks Registration'});
});

router.post('/trucksReg', async (req,res) => {
    try{
        const truck = new Trucks(req.body);
        await truck.save()
        res.redirect('/trucks')
    }catch(err){
        console.log(err);
        res.send('Sorry! Something went wrong')
    }

});

router.get('/', async (req,res) => {
    try{
        let truckSheet = await Trucks.find();
        if (req.query.truckType) {
            truckSheet = await Trucks.find({ truckType: req.query.truckType })
        }
        res.render('trucks', {cars: truckSheet, title: 'Trucks'});
    }catch(err) {
        res.send('Process failed! No trucks retrived');
    }
});

router.get('/updStatus/:id', async (req, res) => {
    try{
        const updateTruck = await Trucks.findOne({_id: req.params.id})
        res.render('updStatus', {car: updateTruck})   
    }catch(err) {
        res.status(400).send('Items not found');
    }
});

router.post('/updStatus', async (req, res) => {
    try {
        await Trucks.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect('/trucks');
    }catch (err) {
        res.status(404).send('Failed to update the truck status')
    };
});
module.exports = router;