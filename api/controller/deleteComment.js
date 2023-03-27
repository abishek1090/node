const commentSchema=require("../models/comment");
const postSchema=require("../models/post");

const deleteComment=async(req,res)=>{

   try{

     const response=await commentSchema.deleteMany({_id:req.body._id});
    const comments= await commentSchema.find({ postId: req.params.id }).sort({ "createdTime": -1 })
     if(response.deletedCount===0) return res.status(404).json("No Items Deleted");
    if(response.deletedCount===1) return res.status(200).json(comments);
   
   }
    catch(err){
     return res.status(502).json("Error Occured");
    }
 }
 exports.deleteComment=deleteComment;