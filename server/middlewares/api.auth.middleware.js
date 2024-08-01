const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const webAuthMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.token; // Replace 'yourCookieName' with the actual name of your cookie

        if (!cookie) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        console.log("cookie received");

        const uri = process.env.MONGO_CONNECTION_URI;

        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db('PakkaKagaz'); 
        const usersCollection = db.collection('users');
        console.log(cookie);

        try {
            // Verify the cookie using JWT
            const decoded = jwt.verify(cookie, process.env.JWT_SECRET); 
            const useremail = decoded.email;
        
            const user = await usersCollection.findOne({ email : useremail });
        
            if (!user || user.isBanned) {
                return res.status(403).json({ message: 'Forbidden' });
            }
        
            return user;
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    } 
};

module.exports = webAuthMiddleware;
