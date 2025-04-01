const mongoose = require("mongoose");

function DbConnection()  {
    // const DB_URL = process.env.MONGO_URI;
    // console.log(process.env.);

    // mongoose.connect(DB_URL, {
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    // });
    
    mongoose.connect("mongodb://localhost:27017/book-management");

    const db = mongoose.connection;
    db.on("error",console.error.bind(console,"Connection error: "));
    db.once('open',function () {
    console.log("Db connected...");
    });
}

module.exports = DbConnection;