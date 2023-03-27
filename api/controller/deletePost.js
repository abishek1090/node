const postSchema=require("../models/post");

const deletePost=async(req,res)=>{

   try{
    const response=await postSchema.deleteOne({_id:req.params.id});
    if(response.deletedCount===0) return res.status(404).json("No Items Deleted");
   if(response.deletedCount===1) return res.status(200).json("Deleted Successfully");
   }
   catch(err){
    return res.status(502).json("Error Occured");
   }
}
exports.deletePost=deletePost;