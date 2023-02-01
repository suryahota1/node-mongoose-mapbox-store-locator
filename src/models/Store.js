const mongoose = require("mongoose");
const { geoCode } = require("../utils/geocoder");

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [ Number ],
        index: "2dsphere",
        required: true
    },
    formattedAddress: String
});

const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [ true, "Please add a store ID"],
        unique: true,
        trim: true,
        maxlength: [10, "Store ID must be less than 10 chanracters"],

    },
    address: {
        type: String,
        required: [ true, "Please add an address"]
    },
    location: {
        type: pointSchema,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Mongoose middleware to geocode address
storeSchema.pre("save", async function ( next ) {
    const loc = await geoCode(this.address);
    this.location = {
        type: "Point",
        coordinates: [
            loc[0].longitude,
            loc[0].latitude
        ],
        formattedAddress: loc[0]["formattedAddress"]
    };
    this.address = undefined;
    next();
})

module.exports = mongoose.model("Store", storeSchema);
