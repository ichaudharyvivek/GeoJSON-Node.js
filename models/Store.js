const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [20, 'Store Id must be less thatn 20 Characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere' //2dsphere supports queries that cal geometries on an earth-like sphere
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Geocode & create location
StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress
    }

    // Do not save address
    this.address = undefined;
    next(); //Since this is a piece of middleware we need to call next
});

module.exports = mongoose.model('Store', StoreSchema);