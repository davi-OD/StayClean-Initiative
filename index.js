//Dependencies
const express = require('express');
const newEmployeeRoutes = require('./routes/newEmployeeRoutes');
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const serviceOrderRoutes = require('./routes/serviceOrderRoutes');
const newUserRoutes = require('./routes/newUserRoutes');
const customerRoutes = require('./routes/customerRoutes');
const truckRoutes = require('./routes/truckRoutes');
const Users = require('./models/Users')
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Requiring express-session(monitors authentication)
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
  });
const passport = require('passport');
// const localStrategy = require("passport-local")

//Instantiations
const app = express();




//Database Conncection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true,
    // useFindAndModify:false
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });

//Configurations
app.set('view engine', 'pug');
app.set('views', './views');

//Middleware
// app.use('/static', express.static('public'));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//Passport Configs
passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
// passport.use(new localStrategy(Users.authenticate()));

//middleware for serving static files
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));
// app.use(express.static('files'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


//Routes
// app.get('/newEmployee', (req,res) => {
//     res.render('newEmployee', {title: 'Register  Employee'})
// });
app.use('/employee', newEmployeeRoutes);
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/orders', serviceOrderRoutes);
app.use('/register', newUserRoutes);
app.use('/customers', customerRoutes);
app.use('/trucks', truckRoutes);


// app.post('/newEmployee', (req,res) => {
//     console.log(res.body)
//     res.send("Data successfully captured")
// });

app.get('*', (req,res) => {
    res.send('The route specified doesnt exist')
});
//hosting on HEROKU
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log('App listening on port' + port));


//Bootstrapping Server
app.listen(3000, () => console.log('App listening on port 3000!'));

