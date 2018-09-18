const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Employees= require('../models/employees')
const config = require('../config')

router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index),function(req, res, next){
    if(req.user.roles=='admin'){
        Employees.aggregate([
            {
                $unwind: "$salary_components"
            },
            {
                $group:{
                    _id: "$salary_components.name",
                    totalMoney:{
                        $sum:{
                                "$cond": {
                                        if: { $eq:["$salary_components.valueType", "INR"]},
                                        then: "$salary_components.value",
                                        else: {$divide: [{$multiply: ["$salary_components.value","$basic_salary"]},100]}
                
                                        }
                                }
                            }
        
                }
            }
        ],function(err, results) {
            if(err){
                console.log(err)
                return;
            }
            else
            res.json(results);
        });
    }
    else{
        Employees.aggregate([
            {
                $unwind: "$salary_components"
            },
            {
                $group:{
                    _id: "$salary_components.name",
                    totalMoney:{
                        $sum:{
                                "$cond": {
                                        if: { $eq:["$salary_components.valueType", "INR"]},
                                        then: "$salary_components.value",
                                        else: {$divide: [{$multiply: ["$salary_components.value","$basic_salary"]},100]}
                
                                        }
                                }
                            }
        
                }
            }
        ],function(err, results) {
            if(err){
                console.log(err)
                return;
            }
            else
            res.json(results);
        });
    }
    
})


module.exports= router