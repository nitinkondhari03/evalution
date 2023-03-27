const mongoose=require("mongoose")


const postScema=mongoose.Schema({
      title:String,
      body:String,
      device:String,
      no_if_comments:String
})

const PostModel=mongoose.model("post",postScema)

module.exports={
      PostModel
}