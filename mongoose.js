const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb://localhost/urlShortner', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
  } catch (error) {
      console.log(`Mongo Error ${error}`)
  }
