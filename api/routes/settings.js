const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const Settings= require('../models/settings')
const config= require('../config')

router.get('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.employee, config.EmployeeController.index), function(req, res, next){
    Settings.find(function(err,settings){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(
                settings
            )
        }
    })
})

router.post('/',passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req, res, next){

    const settings= new Settings({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        percentValue: req.body.percentValue,
        duration: req.body.duration
    });
    Settings.find({
        type: req.body.type
    })
    .exec()
    .then(add_settings=>{
        if(req.body.type=="overtime"){
            if(add_settings.length>=1){
                return res.status(409).json({
                    message: "Not Allowed"
                });
            }
            else{
                settings.save(function(err, createdSettings){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }
                    else{
                        res.status(200).json({
                            message: 'handling post requests',
                            createdSettings: settings
                        })
                    }
                })
            }
        }
        
        else{
            settings.save(function(err, createdSettings){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }
                else{
                    res.status(200).json({
                        message: 'handling post requests',
                        createdSettings: settings
                    })
                }
            })
        }
    })
   
})

router.delete("/:settingId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.shiftId;
    Settings.remove({
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

router.patch("/:settingId",passport.authenticate('jwt', { session: false }), config.allowOnly(config.accessLevels.admin, config.AdminController.index), function(req,res,next){
    const id= req.params.settingId;
    Settings.update({
        _id: id
    },
    {
        $set: {
            type: req.body.type,
            percentValue: req.body.percentValue,
            duration: req.body.duration
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