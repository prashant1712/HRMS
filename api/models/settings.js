const mongoose= require('mongoose')

const settingsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, enum:["overtime","late"], required: true},
    percentValue: {type: Number, required: true},
    duration: {type: Number, required: checkType}

})

function checkType(){
    if(this.type=="deduction")
    return true;
    else
    return false;
}

module.exports=mongoose.model('Settings', settingsSchema);