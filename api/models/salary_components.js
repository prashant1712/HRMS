const mongoose= require('mongoose')

const salarySchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    value: { type: Number, required: true},
    valueType: { type: String, required: true},
    type: { type: String, required: true},
})

module.exports=mongoose.model('Salary_Components', salarySchema);