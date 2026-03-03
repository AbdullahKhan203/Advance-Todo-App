
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hk7485966_db_user:hk7485966_db_user@cluster0.dwopu5t.mongodb.net/hhh");
        console.log("DB connected.");
    } catch (error) {
        console.log("Error in connecting db", error);
    }
};

// export the function for CommonJS
module.exports = connectDB;

