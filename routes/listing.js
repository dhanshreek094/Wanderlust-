const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn , isOwner,validateListings } = require("../middleware");
const listingController = require("../controllers/listings");

// Index Route
router.get("/", wrapAsync(listingController.index)
);

// New Route
router.get("/new", isLoggedIn,listingController.renderNewForm
);

// Create Route
router.post("/",isLoggedIn, validateListings, wrapAsync(listingController.createNewListing));

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Edit Route
router.get("/:id/edit", isLoggedIn ,isOwner, 
    wrapAsync(listingController.editListing));

// Update Route
router.put("/:id", isLoggedIn ,isOwner,
    wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id",isLoggedIn,isOwner,
     wrapAsync(listingController.deleteListing));

module.exports = router;

