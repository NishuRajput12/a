const express = require("express");
const app = express();
const users=require("./routes/users.js");
const posts=require("./routes/post.js");
// const CookieParser=require("cookie-parser");
// app.use(CookieParser("secretcode"));
const session= require('express-session');
const flash =require("connect-flash");
app.use( session({secret:"mysupersecretstring"}));
const path=require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




const sessionOptions ={
  secret:"mysupersecretstring",
  resave:false,
  saveUninitialized:true,
}
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.successMsg= req.flash("success");
  res.locals.errorMsg= req.flash("error");
  next();
})

app.get("/register",(req,res)=>{
  let{name ="anonymous"} = req.query;
  req.session.name = name;
  if(name =="anonymous"){
    req.flash("error","user not registered");
  }else{
    req.flash("success","user registered succesfully!");
  }
  res.redirect("/hello")
});
app.get("/Hello",(req,res) => {
  // console.log (req.flash ('success'));


  res.render("page.ejs",{name:req.session.name } );
});
// app.get("/reqcount",(req,res)=>{
//   if (req.session.count){
//     req.session.count++;
//   }
//   else{
//   req.session.count =1;
//   }
//   res.send(`you send a request ${req.session.count} times`);
// });
// app.get("/test",(req,res)=>{
//   res.send("test succesful!");
// });

















// app.get("/getsignedcookie",(req,res)=>{
//   res.cookie("made-in","india",{signed:true});
//   res.send("signed cookie send");
// });
// app.get("/verify",(req,res)=>{
//   console.log(req.signedCookies);
//   res.send("verified");
// })
// app.get("/getcookies",(req,res)=>{
// res.cookie("namesta ji","hello");
// res.send("send you some cookies");
// })
// app.get("/greet",(req,res)=>{
//   let{name ="anoymous"}=req.cookies;
//   res.send(`hi i,${name}`)
// })
// app.get("/",(req, res)=>{
//   console.dir(req.cookies);
//     res.send("hi i am nishu !");
//   });

app.use("/users",users)
app.use("/posts",posts)

app.listen(3000,()=>{
    console.log("server is listing to 3000");
});