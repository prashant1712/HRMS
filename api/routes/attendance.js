const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Attendance= require('../models/attendance')
const config = require('../config')
//config.allowOnly(config.accessLevels.employee, config.EmployeeController.index),
router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index),function(req, res, next){
    var query={}
    if(req.user.roles=='employee'){
        query={
            employee_id: req.user._id    
        }
    }
    
    Attendance.find(query)
    .exec(function(err, attendance){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(
                attendance
            )
        }
    }) 
})

router.post('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index),function(req, res, next){

    const attendance= new Attendance({
        _id: new mongoose.Types.ObjectId(),
        employee_id: req.body.employee_id,
        eachDayAttendance: req.body.eachDayAttendance
    });
    attendance.save(function(err, createdAttendance){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.status(200).json({
                message: 'handling post requests',
                createdAttendance: attendance
            })
        }
    })   
})

router.patch("/:attendanceId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index),function(req,res,next){
    const id= req.params.attendanceId;
    Attendance.update({
        _id: id
    },
    {
        $set: {
            employee_id: req.body.employee_id,
            eachDayAttendance: req.body.eachDayAttendance
        }
    })
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports= router