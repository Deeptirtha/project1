const mongoose=require('mongoose');
const authorSchema=new mongoose.Schema({
     fname:{
        type: String ,
        require:true
    },
     lname: {
        type:String,
        require:true
    }, 
    title: {
        type:String,
        require:true, 
        enum:["Mr", "Mrs", "Miss"]}, 
   email: {
           type:String,
           require:true,
         lowercase:true
            },
     password: {
        type:String,
        require:true}
     },{timestemps:true}
)

module.exports =mongoose.model('Author',authorSchema)
