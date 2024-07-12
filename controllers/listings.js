const { model } = require("mongoose");
const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
   return  res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new.ejs",{});
   };
   module.exports.ShowListing=async(req,res)=>{
    let{id}=req.params;
      const listing=await Listing.findById(id)
      .populate({
        path:"reviews",
        populate:{
        path:"author"
      },
    })
        .populate("owner");
     if(!listing){
      req.flash("error","Listing does not exists");
      return res.redirect("/listings");
      }
      console.log(listing);
      res.render("listings/show.ejs",{listing});
  };

  module.exports.createListing = async(req,res,next) =>{
    let url=req.file.path;
    let filename = req.file.filename;
    const newListing =new Listing(req.body.listing);
   console.log(req.user);
    newListing.owner =req.user._id;
    newListing.image={url,filename};
     await newListing.save();
     req.flash("success","New Listing created!");
     res.redirect("/listings"); 
   
   };

   module.exports.renderEditForm=async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing does not exists");
      return res.redirect("/listings");
      }
  //     let originalImageUrl=listing.image.url;
  //     originalImageUrl = originalImageUrl.replace("/upload","upload/h_300,w_250");
  //   res.render("listings/edit.ejs",{listing, originalImageUrl});
  //
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/,w_250");

  res.render("./listings/edit.ejs", { listing,originalImageUrl });
};

  module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
     let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if( typeof req.file !=="undefined"){
     let url=req.file.path;
     let filename = req.file.filename;
     listing.image={url,filename};
     await listing.save();
    }
     req.flash ("success"," Listing Updateed ");
     res.redirect(`/listings/${id}`);
  };

  module.exports.DestroyListing =async (req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Delete!");

    console.log(deletedListing);
    res.redirect("/listings");
  }