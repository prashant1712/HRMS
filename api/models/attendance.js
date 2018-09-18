const mongoose= require('mongoose')

const attendanceSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: mongoose.Schema.Types.ObjectId,
    eachDayAttendance: [{
        _id: mongoose.Schema.Types.ObjectId,
        Date: {type: Date, required: true},
        checkintime: {type: Date,required: true},
        checkouttime: {type: Date,required: true}
    }]
})

module.exports=mongoose.model('Attendance', attendanceSchema);