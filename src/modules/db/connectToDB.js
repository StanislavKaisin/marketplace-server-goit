const mongoose = require('mongoose');

const connectToDB = (DBURL) => {
  mongoose.connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log('Database connection success')
    })
    .catch((error) => {
      console.error('Database connection error', error)
    })
}
module.exports = connectToDB;
