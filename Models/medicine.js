const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    quantity:{
        type:String,
    },
    usage:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamps:true});

const MedicineModel = mongoose.model("medicine",MedicineSchema);

module.exports = MedicineModel