const Listing = require("./models/listing");
const mongoose = require("mongoose");
const { listingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req , res , next ) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl ;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req , res , next ) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    try {
        let listing = await Listing.findById(id).populate("owner");

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        console.log("Listing Owner ID:", listing.owner._id.toString());
        console.log("Current User Object:", res.locals.currUser);
        console.log("Current User ID:", res.locals.currUser ? res.locals.currUser._id.toString() : "No User");
        if (!res.locals.currUser || !listing.owner._id.equals(new mongoose.Types.ObjectId(res.locals.currUser._id))) {
            req.flash("error", "You don't have permission to edit this listing");
            return res.redirect(`/listings/${id}`);
        }

        next(); 
    } catch (error) {
        console.error("Error in isOwner Middleware:", error);
        req.flash("error", "Something went wrong");
        return res.redirect("/listings");
    }
};



module.exports.validateListings = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

