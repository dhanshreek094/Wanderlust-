const Listing = require("./models/listing");
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

module.exports.isOwner = async(req , res , next) => {
    let {id} = req.params;
    let Listing = Listing.findById(id);
    if(!currUser && listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have access to edit");
       return res.redirect(`/listings/${req.params.id}`);
        }
}