const express=require("express");
const router=express.Router();
//Index-users
router.get("/",(req,res)=>{
    res.send("GET for users");
});
//post
router.post("/",(req,res)=>{
    res.send("post for users");
});
//Show-users
router.get("/:id",(req,res)=>{
    res.send("GET for show users");
});
//Delete
router.delete("/:id",(req,res)=>{
  
    res.send("Delete for show users");
});
module.exports =router;