const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn , isOwner,validateListings } = require("../middleware");


// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// New Route
router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new");
});

// Create Route
router.post("/",isLoggedIn, validateListings, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id ;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}));

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
        path :"reviews",
         populate:{
        path : "author",
    },
}).populate("owner");
    res.render("listings/show", { listing });
    console.log(listing);
}));

// Edit Route
router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
}));

// Update Route
router.put("/:id", isLoggedIn ,isOwner, wrapAsync(async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${req.params.id}`);
}));

// Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}));

module.exports = router;

