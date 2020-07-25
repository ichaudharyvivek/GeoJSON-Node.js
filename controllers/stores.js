const Store = require('../models/Store');

//  @desc Get all stores
//  @route GET /api/v1/stores
//  @access Public
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' })
    }
}

//  @desc Create a store
//  @route POST /api/v1/stores
//  @access Public
exports.addStores = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        return res.status(200).json({
            success:true,
            data:store
        })
    } catch (err) {
        console.log(err);
        if (err.code === 11000){
            return res.status(400).json({error: 'This store already exist'})
        }
        res.status(500).json({ error: 'Server Error' })
    }
}