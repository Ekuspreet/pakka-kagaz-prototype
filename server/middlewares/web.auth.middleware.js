const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const webAuthMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.token; // Replace 'yourCookieName' with the actual name of your cookie

        if (!cookie) {
            res.redirect('/');
            return;
        }
        
        console.log("cookie received");

        const uri = process.env.MONGO_CONNECTION_URI;
  
        const client = new MongoClient(uri);
        await client.connect();
        
        const db = client.db('PakkaKagaz'); 
        const usersCollection = db.collection('users');
        console.log(cookie);

        // Verify the cookie using JWT
        try {
            const decoded = jwt.verify(cookie, process.env.JWT_SECRET); 
            const useremail = decoded.email;
        
            const user = await usersCollection.findOne({ email : useremail });
        
            if (!user || user.isBanned) {
                res.redirect('/');
                return;
            }
        
            return user;
        } catch (error) {
            res.redirect('/');
            return;
        }
    } catch (error) {
        res.redirect('/');
        return;
    } 
};

module.exports = webAuthMiddleware;
