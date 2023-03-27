const express=require("express")

const { PostModel}=require("../model/Post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
      const posts=await PostModel.find()
  
      res.send(posts)
})

postRouter.patch("/update/:id",async(req,res)=>{
      const payload=req.body
      const id=req.params.id

      const post=await PostModel.findOne({"_id":id})
      const userID_in_post=post.userID
      const userID_making_req=req.body.userID
      try {
            if(userID_making_req===userID_in_post){
                  res.send({"msg":"you are not authorized"})
 
            }else{
                  await PostModel.findByIdAndUpdate({"_id":id},payload) 
                  res.send("Update the post") 
            }
         
      } catch (err) {
           console.log(err)
           res.send({"msg":"Something went wrong"}) 
      }
})

postRouter.post("/create",async(req,res)=>{
      const payload=req.body
      const post=new PostModel(payload)
      await post.save()
      res.send({"msg":"post Created"})
})


postRouter.delete("delete/:id",async(req,res)=>{
      const noteID=req.params.id
      await PostModel.findByIdAndDelete({_id:noteID})
      res.send({"msg":`post with id :${noteID} has been deleted`})
})

module.exports={
      postRouter
}