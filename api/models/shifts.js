const mongoose= require('mongoose')

const shiftsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    starttime: { type: Date, default: Date.now, required: true },
    endtime: {type: Date, required: true}
})

module.exports=mongoose.model('Shifts', shiftsSchema);