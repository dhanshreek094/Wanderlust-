const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to DB:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const intDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData); 
    console.log("Data was initialized");
};

intDB();
