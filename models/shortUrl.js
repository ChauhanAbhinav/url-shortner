const mongoose = require('mongoose')
const shortId  = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    url: {type: String, required: true},
    shortUrl: {type: String, required: true, default: shortId.generate},
    clicks: {type: Number, required: false, default:0},
    lastClick: {type: Date, required: false, default: new Date()},
    crtd: {type: Date, required: false, default: new Date()},
})

module.exports = mongoose.model('shortUrl', shortUrlSchema);