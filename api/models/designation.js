const mongoose= require('mongoose')

const designationSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    basic_salary: { type: Number, required: true},
    totalSalary: { type: Number, required: true},
    salary_components: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true},
        value: { type: Number, required: true},
        valueType: { type: String, required: true},
        type: { type: String, required: true}
    }]
})

module.exports=mongoose.model('Designation', designationSchema);