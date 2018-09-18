const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Designation= require('../models/designation')
const config = require('../config')

router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index),function(req, res, next){
    Designation.find(function(err,designations){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(
                designations
            )
        }
    })
})

router.post('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){

    const designation= new Designation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        totalSalary: req.body.totalSalary,
        basic_salary: req.body.basic_salary,
        salary_components: req.body.salary_components
    });
    designation.save(function(err, createdDesignation){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.status(200).json({
                message: 'handling post requests',
                createdDesignation: designation
            })
        }
    })   
})


router.delete("/:designationId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.designationId;
    Designation.remove({
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

router.patch("/:designationId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.designationId;
    Designation.update({
        _id: id
    },
    {
        $set: {
            name: req.body.name,
            totalSalary: req.body.totalSalary,
            basic_salary: req.body.basic_salary,
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