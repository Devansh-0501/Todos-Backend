const mongoose = require('mongoose');


 const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
module.exports = ConnectDB;



//1N73dn1fNvZi32Vx
//mongodb+srv://devansh055leo:1N73dn1fNvZi32Vx@cluster0.i802bm7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0