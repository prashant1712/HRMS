const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Employee= require('../models/employees')
const bcrypt = require("bcrypt");
const config = require('../config')

router.get('/view',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index), function(req, res, next){
    var query={}
    if(req.user.roles=='employee'){
        query={
            _id: req.user._id    
        }
    }
    Employee.find(query)
    .exec(function(err,employees){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            // console.log(employees)
            res.json(
                employees
            )
        }
    })
})




router.post('/create',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){

    Employee.find({
        username: req.body.username
    })
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "Username exists"
            });
        }
    
        else{
            bcrypt.hash(req.body.password,10, function(err, hash){
                if(err){
                    console.log(req.body.password)
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    const employee= new Employee({
                        _id: new mongoose.Types.ObjectId(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        contact_no: req.body.contact_no,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        designationName: req.body.designationName,
                        totalSalary: req.body.totalSalary,
                        basic_salary: req.body.basic_salary,
                        shifts: req.body.shifts,
                        permanent: req.body.permanent,
                        current: req.body.current,
                        salary_components: req.body.salary_components
                    });
                    employee.save(function(err, createdEmployee){
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }
                        else{
                            res.status(200).json({
                                message: 'handling post requests',
                                createdEmployee: employee
                            })
                        }
                    })  
                }   
            })
        }
    })
})


router.delete("/view/:employeeId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.employeeId;
    Employee.remove({
        _id: id
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
})

router.patch("/view/:employeeId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.employeeId;
    Employee.update({
        _id: id
    },
    {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contact_no: req.body.contact_no,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            designationName: req.body.designationName,
            totalSalary: req.body.totalSalary,
            basic_salary: req.body.basic_salary,
            shifts: req.body.shifts,
            permanent: req.body.permanent,
            current: req.body.current,
            salary_components: req.body.salary_components
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

//for the dashboard
// Employee.aggregate([
//     {
//         $unwind: "$salary_components"
//     },
//     {
//         $group:{
//             "_id": "$salary_components.name",
//             $cond: {
//                         if: {"$salary_components.valueType" : "INR"},
//                         then: {"totalMoney": { $sum: "$salary_components.value"}},
//                         if: {"$salary_components.valueType" : "percent"},
//                         then: {"totalMoney": { $sum: {$divide: [{$multiply: ["$salary_components.value","$basic_salary"]},100]}}},

//             }

//         }
//     }
// ])