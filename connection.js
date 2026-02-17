// const { response } = require('express')
// const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://vamshi242010_db_user:vamshi1010@cluster0.nwopc3f.mongodb.net/dispensaryDB?retryWrites=true&w=majority')
// // mongoose.connect('mongodb://localhost:27017/dispensaryDB')
//     .then(res=>{
//         console.log("database Connected successfully"); 
//     }).catch(err=>{
//         console.log(err);
//     })


const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://vamshi242010_db_user:vamshi1010@cluster0.nwopc3f.mongodb.net/dispensaryDB?retryWrites=true&w=majority'
)
.then(() => {
  console.log("Database connected successfully to dispensaryDB");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});
