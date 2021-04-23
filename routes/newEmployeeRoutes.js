const express = require('express');
const router = express.Router();
const multer = require('multer');  
const Employee = require('../models/Employee')

router.get('/newEmployee', (req,res) => {
    res.render('newEmployee', {title: 'Register Employee'});
});

// router.get('/', (req,res) => {
//     res.render('employeeList', {title: 'Employees'});
// });


// image upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })
    

router.post('/newEmployee', upload.single('imageUpload'), async (req, res) => {
    // if (req.session.user) {
        try{
            const employee = new Employee(req.body);
            employee.imageUpload = req.file.path;
            await employee.save()
            res.redirect('/employee')
            // res.send('Thank you for your registration') 
        }catch(err){
            console.log(err);
            res.send('Sorry! Something went wrong.')
        }
    // }else {
    //     console.log('Session not found')
    //     res.redirect('/login')
    // }
        
        // .then(() => {res.send('Thank you for your registration!')})
        // .catch((err) => {
        //     console.log(err);
        //     res.send('Sorry! Something went wrong.');
        // })
        // try {
        //     console.log(req.file)
        //     console.log(req.body)
        // }catch (err) { 
        //     res.send(400);
        // }
        // res.send('Hello, request recieved')
});
   

router.get('/', async (req,res) => {
    //finding data in employee collection. pick is a property and can be anything
    // if (req.session.user) {
        try{
            let employeeInfo = await Employee.find();
            if (req.query.role) {
                employeeInfo = await Employee.find({ role: req.query.role })
            }
            res.render('employeeList', {pick: employeeInfo, title: 'List of Employees'});
        }catch(err){
            res.send('Process failed! No employees retrived');
        }
    // }else {
    //     console.log('Session not found')
    //     res.redirect('/login')
    // }    
});

// router.post('/newEmployee', (req,res) => {
//     res.send(req.body);
    
    
// }); 

router.get('/update/:id', async (req, res) => {
    // if (req.session.user) {
        try{
            const updateEmploy_ee = await Employee.findOne({_id: req.params.id})
            res.render('employeeDetail', {person: updateEmploy_ee})
        }catch (err) {
            res.status(400).send("Item not found in the database");
        }
    // }else {
    //     console.log('Session not found')
    //     res.redirect('/login')
    // }        
});
//Saving the updated data
router.post('/update', async (req, res) => {
    // if (req.session.user) {
        try {
            await Employee.findOneAndUpdate({_id:req.query.id}, req.body)
            res.redirect('/employee');
        } catch (err) {
            res.status(404).send("Failed to update item in the database")
        }
    // }else {
    //     console.log('Session not found')
    //     res.redirect('/login')
    // }        
});
//deleting the employee
router.post('/delete', async (req,res) => {
    // if (req.session.user) {
        try {
            await Employee.deleteOne({_id: req.body.id})
            res.redirect('back')
        } catch (err) {
            res.status(400).send('Failed to delete item in the database')
        }
    // }else {
    //     console.log('Session not found')
    //     res.redirect('/login')
    // }            
});


module.exports = router;