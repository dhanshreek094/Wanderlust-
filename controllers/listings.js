const Listing = require("../models/listing");
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm =(req, res) => {
    res.render("listings/new");
};

module.exports.createNewListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id ;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
        path :"reviews",
         populate:{
        path : "author",
    },
}).populate("owner");
    res.render("listings/show", { listing });
    console.log(listing);
};

module.exports.editListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};