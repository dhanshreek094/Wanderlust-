const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default:
            "https://www.shutterstock.com/image-photo/flower-growing-broken-link-heavy-260nw-2554251761.jpg",
        set: (v) => v === "" 
            ? "https://www.shutterstock.com/image-photo/flower-growing-broken-link-heavy-260nw-2554251761.jpg" 
            : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Review" }
    ],
        owner : {
            type : Schema.Types.ObjectId,
            ref: "User",
        },
});

listingSchema.post("findOneAndDelete" , async (Listing) => {
    if (Listing){
        await Review.deleteMany({_id : {$in : listingSchema.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
