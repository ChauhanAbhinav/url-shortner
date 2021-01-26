const express = require('express')
const app = express()
const APP_PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:false})); 

app.set('view engine', 'ejs')

// mongoose
require('./mongoose')

// model
const ShortUrl = require('./models/shortUrl')

app.get('/', async (req, res)=>{
    let shortUrls = await ShortUrl.find({},null, {sort:'-_id'})
    res.render('index.ejs', {shortUrls})
})

app.post('/shortUrl', async (req, res)=>{
    let url = await ShortUrl.create({url : req.body.url})
    console.log(`Url created: ${req.body.url}, shortId: ${url.shortUrl}`)
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res)=>{
    let url = await ShortUrl.findOne({shortUrl: req.params.shortUrl})
    if(!url) return res.sendStatus(404)
    console.log(`Url clicked: ${url.url}, shortId: ${url.shortUrl}`)
    url.clicks++
    url.lastClick = new Date()
    url.save()
    res.redirect(url.url);
})

app.listen(APP_PORT, ()=>{
    console.log(`App is listening on port: ${APP_PORT}`)
})