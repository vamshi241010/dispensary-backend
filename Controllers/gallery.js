const GalleryModal = require('../Models/gallery');

exports.addImage = async(req,res)=>{
    try {
        const {link} = req.body;
        const image = new GalleryModal({link,addedBy:req.user._id});
        await image.save();
        res.status(200).json({message : "Image Added Successfully",image})
    } catch (err) {
         console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        });
    }
}

exports.getAllGallery = async(req,res)=>{
    try {
        const images = await GalleryModal.find();
        return res.status(200).json({
            message:"Image Fetched Successfully",
            images
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        });
    }
}

exports.deleteImageById = async(req,res)=>{
    try {
        const {id} = req.params;
        const image = await GalleryModal.findByIdAndDelete(id);
        if(image){
            return res.status(200).json({
            message:"Image Deleted Successfully",
        })
        }
        return res.status(500).json({
            error:"No Such Image Found"
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        });
    }
}