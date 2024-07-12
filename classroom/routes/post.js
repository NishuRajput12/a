const express=require("express");
const router=express.Router();

//Index-post
router.get("/",(req,res)=>{
    res.send("GET for posts");
});
//post
router.post("/",(req,res)=>{
    res.send("post for posts");
});
//Show-users
router.get("/:id",(req,res)=>{
    res.send("GET for show posts");
});
//Delete
router.delete("/:id",(req,res)=>{
    res.send("Delete for show posts");
});

module.exports=router;