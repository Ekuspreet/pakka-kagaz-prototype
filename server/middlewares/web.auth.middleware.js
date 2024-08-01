const { MongoClient } = require('mongodb');

const webAuthMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.token; // Replace 'yourCookieName' with the actual name of your cookie

        if (!cookie) {
            return res.redirect('/');
            next();
        }

        const uri = process.env.MONGO_CONNECTION_URI; // Replace with your MongoDB connection URI
        const client = new MongoClient(uri);

        await client.connect();

        const db = client.db('PakkaKagaz'); 
        const usersCollection = db.collection('users'); collection
        const user = await usersCollection.findOne({ _id: cookie });

        if (!user || user.isBanned) {
            return res.redirect('/');
            next();
        }

        return user;
    } catch (error) {
        console.error(error);
        res.redirect('/');
    } finally {
        client.close(); // Close the MongoDB connection
    }
};

module.exports = webAuthMiddleware;