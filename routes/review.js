const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
// const { listingSchema } = require("./schema.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn ,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");


// Review POST route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
  );
  
  // Delete review route
  router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.reviewDelete)
  );
  module.exports=router;
