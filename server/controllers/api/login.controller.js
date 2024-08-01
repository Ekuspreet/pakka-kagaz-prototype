const express = require("express");
const { MongoClient } = require("mongodb");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Login request received");
    try {
        const { email, password } = req.body;
        const client = new MongoClient(process.env.MONGO_CONNECTION_URI);
        await client.connect();
        const db = client.db("PakkaKagaz");
        const collection = db.collection("users");

        // Find the user by email
        const user = await collection.findOne({ email });
        if (!user) {
            await client.close();
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            await client.close();
            return res.status(400).json({ message: "Invalid email or password" });
        }

        await client.close();

        // Generate a JWT with the user's email as the payload
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

        // Set the JWT in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
