const NodeGeoCoder = require("node-geocoder");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: "https",
    apiKey: process.env.MAPQUEST_API_KEY,
    formatter: null
};

const geoCoder = NodeGeoCoder(options);

function geoCode ( address ) {
    return geoCoder.geocode(address);
}

function reverseGeoCode () {

}

module.exports = { geoCode, reverseGeoCode };
