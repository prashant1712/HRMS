const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Salary_Component= require('../models/salary_components')
const config = require('../config')

router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){
    Salary_Component.find(function(err,components){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(
                components
            )
        }
    })
    .select('name value valueType type _id')
})

router.post('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){

    const salary_component= new Salary_Component({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        value: req.body.value,
        valueType: req.body.valueType,
        type: req.body.type
    });
    salary_component.save(function(err, createdSalary){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.status(200).json({
                message: 'handling post requests',
                createdSalary: salary_component
            })
        }
    })   
})

router.delete("/:salaryId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.salaryId;
    Salary_Component.remove({
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

router.patch("/:salaryId",passport.authenticate('jwt', { session: false }),config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.salaryId;
    Salary_Component.update({
        _id: id
    },
    {
        $set: {
            name: req.body.name,
            value: req.body.value,
            valueType: req.body.valueType,
            type: req.body.type
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