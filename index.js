const express = require("express")
const app = express();
const cookieparser = require("cookie-parser")
const cors = require("cors")

require('dotenv').config({path:"./.env"})

app.use(express.json());
app.use(cookieparser());

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));


require('./connection');

const userRoutes = require('./Routes/user');
const facilityRoutes = require('./Routes/facility')
const medicineRoutes = require('./Routes/medicine')
const hospitalRoutes = require('./Routes/nearByHospital')
const notificationRoutes = require('./Routes/notification')
const galleryRoutes = require('./Routes/gallery')
const historyRoutes = require('./Routes/history')
app.use("/api/auth",userRoutes)
app.use("/api/facility",facilityRoutes)
app.use("/api/medicine",medicineRoutes)
app.use("/api/hospital",hospitalRoutes);
app.use("/api/notification",notificationRoutes);
app.use("/api/gallery",galleryRoutes);
app.use('/api/history',historyRoutes)
app.listen(process.env.PORT,()=>{
    console.log("successfully running on port 4000");
})

// vamshi242010_db_user
// MKVJ1I8Sclby22UE
//mongodb+srv://vamshi242010_db_user:<db_password>@cluster0.nwopc3f.mongodb.net/?appName=Cluster0