const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;

async function  connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,        
        });
        console.log("Connect Succesfully")
    } catch (error) {
        console.log("Connect Failure")
    }

}

module.exports = {connect};
