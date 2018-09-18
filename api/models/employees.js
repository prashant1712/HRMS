const mongoose= require('mongoose')
const bcrypt = require("bcrypt");

const employeeSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    contact_no: {type: Number, required: true},
    username: {type: String, required: true, unique: true},
    roles: {
                type: String,
                enum:["employee", "admin"],
                required: true
            },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    basic_salary: { type: Number, required: true},
    totalSalary: { type: Number, required: true},
    designationName: {type: String, required: true},

    permanent: {
        address: { type: String, required: true},
        city: { type: String, required: true}
    },

    current: {
        address: { type: String, required: true },
        city: { type: String, required: true}
    },

    shifts: {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true},
        starttime: { type: Date, default: Date.now, required: true },
        endtime: {type: Date, required: true}
    },

    salary_components: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true},
        value: { type: Number, required: true},
        valueType: { type: String, required: true},
        type: { type: String, required: true}
    }]
})

employeeSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };


module.exports=mongoose.model('Employee', employeeSchema);