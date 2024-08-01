const { MongoClient } = require('mongodb');

const webAuthMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.token; // Replace 'yourCookieName' with the actual name of your cookie

        if (!cookie) {
            res.redirect('/');
            next();
        }
        console.log("cookie recieved");

        const uri = process.env.MONGO_CONNECTION_URI; // Replace with your MongoDB connection URI
        const client = new MongoClient(uri);

        await client.connect();

        const db = client.db('PakkaKagaz'); 
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: cookie });

        if (!user || user.isBanned) {
            res.redirect('/');
            next();
        }

        return user;
    } catch (error) {
        console.error(error);
            res.redirect('/');
            next();
    } 
};

module.exports = webAuthMiddleware;