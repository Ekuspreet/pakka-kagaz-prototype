const express = require("express");
const { MongoClient } = require("mongodb");
const argon2 = require("argon2");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = req.body;
        const client = new MongoClient(process.env.MONGO_CONNECTION_URI);
        await client.connect();
        const db = client.db('PakkaKagaz');
        const collection = db.collection("users");
        
        // Check if user already exists
        const existingUser = await collection.findOne({ email: user.email });
        if (existingUser) {
            await client.close();
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Encrypt the password with Argon2
        const hashedPassword = await argon2.hash(user.password);
        
        // Insert the user with the hashed password
        const result = await collection.insertOne({ ...user, password: hashedPassword });
        await client.close();
        
        // Set the inserted ID in the response header
       
        res.status(200).json({ message: "User inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;