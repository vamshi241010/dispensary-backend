// const jwt = require('jsonwebtoken');
// const UserModel = require('../Models/user');

// exports.studentAuth = async(req,res,next)=>{
//     try {
//        const token = req.cookies.token;
//        if(token){
//         const decode = jwt.verify(token,"Its_My_Secret_Key");
//         req.user = await UserModel.findById(decode.userId).select('-password');
//         next();
//        }else{
//         return res.status(401).json({error : 'No token, authorization denied'});
//        }
//     } catch (err) {
//         res.status(401).json({error:'Something Went Wrong in Authentication '})
//     }
// }

// exports.adminFacultyAuth = async(req,res,next)=>{
//     try {
//        const token = req.cookies.token;
//        if(token){
//         const decode = jwt.verify(token,"Its_My_Secret_Key");
//         req.user = await UserModel.findById(decode.userId).select('-password');

//         if(req?.user?.role==="student"){
//             throw new Error("You dont have access to this page");
//         }
//         next();
//        }else{
//         return res.status(401).json({error : 'No token, authorization denied'});
//        }
//     } catch (err) {
//         res.status(401).json({error:'Something Went Wrong in Authentication '})
//     }
// }

const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');

exports.studentAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decode.userId).select('-password');

        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: err.message || 'Authentication failed' });
    }
};

exports.adminFacultyAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decode.userId).select('-password');

        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (req.user.role === "student") {
            return res.status(403).json({ error: "Access denied. Admin/Faculty only" });
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: err.message || 'Authentication failed' });
    }
};
