const mongoose = require("mongoose")
require("dotenv").config();

module.exports =() =>{ 
    return mongoose.connect(process.env.mongoURI)
}
mongoose.connection.on("connected", () => {
    console.info("MongoDB connected Successfully!!");
});
mongoose.connection.on("error", err  => {
    console.error(`Error in mongoose connection: ${err.message}`);
});
mongoose.connection.on("disconnected", () => {
    console.info("Mongoose connection is disconnected");
    });
    process.on("SIGINT", function() {
        mongoose.connection.close(() => {
            process.exit(0);
        });
    });