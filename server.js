const express= require('express');
const app=express();
const morgan= require('morgan');
const bodyParser= require('body-parser');
const mongoose= require('mongoose')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT= require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

require('./config/passport');

const dashboardRoutes= require('./api/routes/dashboard');
const salary_componentsRoutes= require('./api/routes/salary_components')
const designationRoutes= require('./api/routes/designation')
const employeesRoutes= require('./api/routes/employees')
const shiftsRoutes= require('./api/routes/shifts')
const loginRoutes = require('./api/routes/login');
const attendanceRoutes= require('./api/routes/attendance')
const settingsRoutes= require('./api/routes/settings')

mongoose.connect('mongodb://localhost/hrms');

app.use(express.static(__dirname+"/public"))

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(passport.initialize());



app.use('/login',passport.authenticate('local',
                                                { 
                                                    session: false,
                                                    failureRedirect: '/login',
                                                    failureFlash: true
                                                }),
                                                loginRoutes)
app.use('/salary_components',salary_componentsRoutes)
app.use('/designation',designationRoutes)
app.use('/employees', employeesRoutes)
app.use('/shifts',shiftsRoutes)
app.use('/attendance',attendanceRoutes)
app.use('/settings',settingsRoutes)
app.use('/dashboard',dashboardRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); 
});

app.use(function(req,res,next){
    const error= new Error('Not Found');
    error.status=404;
    next(error);
})

app.use( function(error, req,res, next){
    // console.log(req)
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})




/*clustering code to utilize all the cores of the processors*/

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('Master '+process.pid+' is running')
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

   Object.keys(cluster.workers).forEach(function(id) {
    console.log("Worker running with ID : "+cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} 
else {
    //  console.log("entry level of the app")
     app.listen(3000, function(){
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
     })

module.exports= app;
        
}