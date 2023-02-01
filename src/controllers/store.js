const Store = require("./../models/Store");

// @desc Get all stores
// @route GET /api/v1/stores
// @access Public
async function getStores ( req, res, next ) {
    try {
        const stores = await Store.find();
        res.status(200).json({
            data: stores
        });
    } catch ( e ) {
        console.log(e);
        res.status(500).json({
            message: e.message
        })
    }
}

// @desc Create a store
// @route GET /api/v1/stores
// @access Public
async function createStore ( req, res, next ) {
    try {
        const store = await Store.create(req.body);
        res.status(201).json({
            data: store
        });
    } catch ( e ) {
        console.log(e);
        res.status(500).json({
            message: e.message
        });
    }
}

module.exports = { getStores, createStore };