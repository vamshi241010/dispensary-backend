const HistoryModal = require('../Models/history')
const MedicineModal = require('../Models/medicine')

exports.addHistory = async(req,res)=>{
    try {
        let {roll,student,medicines} = req.body;

        let medicineData = medicines.map((item)=>{
            let{_id,name,requiredQuantity} = item;
            return {_id,name,requiredQuantity};
        })

        medicineData.map(async(item)=>{
            let medicineeData = await MedicineModal.findById(item._id);
            let leftQuantity = parseInt(medicineeData?.quantity) - parseInt(item.requiredQuantity);
            medicineeData.quantity = leftQuantity.toString();
            await medicineeData.save();
        })

        const addData = new HistoryModal({roll,student,medicines});
        await addData.save();

        return res.status(200).json({
            message:"Added Successfully"
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        });
    }
}

exports.getHistoryByData = async(req,res)=>{
    try {
        let {month,year} = req.query;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
        const startDate = new Date(year,monthIndex,1);
        const endDate = new Date(year,monthIndex+1,1);
        const history = await HistoryModal.find({
            createdAt: { $gte : startDate, $lt:endDate},
        }).populate("student").sort({createdAt:-1});

        return res.status(200).json({
            message : "Fetched Successfully",
            history
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        });
    }
}

exports.getStudentHistory = async(req,res)=>{
    try {
        const {roll} = req.query;
        const history = await HistoryModal.find({roll}).populate("student").sort({createdAt:-1});
        if(history.length==0){
            return res.status(400).json({error : "No any record for this roll"})
        }

        return res.status(200).json({
            message:"Fetched Successfully",
            history
        })
    } catch (err) {
       console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        }); 
    }
}