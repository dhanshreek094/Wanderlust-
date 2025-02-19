const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn , isOwner,validateListings } = require("../middleware");
const reviewController = require("../controllers/review");

// Middleware for validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// Create Review
router.post("/",isLoggedIn, validateReview, 
    wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId", isLoggedIn ,
     wrapAsync(reviewController.deleteReview));

module.exports = router;
