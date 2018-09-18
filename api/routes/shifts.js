const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Shifts= require('../models/shifts')
const config= require('../config')

router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){
    // var query={}
    // if(req.user.roles=='employee'){
    //     query={
    //         employee_id: req.user._id    
    //     }
    // }
    Shifts.find(function(err,shifts){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(
                shifts
            )
        }
    })
    .select('name starttime endtime _id')
})

router.post('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){

    const shifts= new Shifts({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        starttime: req.body.starttime,
        endtime: req.body.endtime
    });
    shifts.save(function(err, createdShifts){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.status(200).json({
                message: 'handling post requests',
                createdShifts: shifts
            })
        }
    })   
})

router.delete("/:shiftId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.shiftId;
    Shifts.remove({
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

router.patch("/:shiftId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.shiftId;
    Shifts.update({
        _id: id
    },
    {
        $set: {
            name: req.body.name,
            starttime: req.body.starttime,
            endtime: req.body.endtime
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