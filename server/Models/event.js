const mongoose =require("mongoose")
Schema= mongoose.schema;

//create a schema
const eventSchema=new Schema({
    name:String,
    slug:{String,
    unique:true},
    description:String
})




//create the model
const eventModel=mongoose.model("Event",eventSchema)

//export the model
module.exports=eventModel;