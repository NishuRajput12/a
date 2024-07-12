

// const Joi = require("joi");

// const review = require("./models/review");
// const { comment } = require("postcss");
// module.exports.ListingSchema= Joi.object({
// listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     Price: Joi.number().required().min(0),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//     image: Joi.string().allow("",null)




// }).required()
// });


const Joi = require("joi");
const review = require("./models/review");
const { comment } = require("postcss");
module.exports .reviewSchema = Joi.object({
review:Joi.object({
    rating:Joi.number().required().min(0).max(5),
    comment:Joi.string().required(),
}).required()
});