const { MongoClient } = require('mongodb');

const webAuthMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.token; // Replace 'yourCookieName' with the actual name of your cookie

        if (!cookie) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const uri = process.env.MONGO_CONNECTION_URI; // Replace with your MongoDB connection URI
        const client = new MongoClient(uri);

        await client.connect();

        const db = client.db('PakkaKagaz'); 
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: cookie });

        if (!user || user.isBanned) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        return user;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.close(); // Close the MongoDB connection
    }
};

module.exports = webAuthMiddleware;
