const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log("MongoDB connected: " + connection.connection.host)
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDatabase;