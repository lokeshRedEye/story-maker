import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors"; // Import CORS
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

const app = express();
const genAI = new GoogleGenerativeAI("AIzaSyBx7nG-qrJTIs2_awqJD4ujynieZPWY7tg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

app.post('/generate-story', async (req, res) => {
    const { genre, description } = req.body;
    console.log(genre , description)

    // Construct a prompt based on genre and description
    const prompt = `Write a story about a ${genre} with the following description: ${description} (With simple english and easy to understand by anyone )`;

    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text(); // Get generated text

        // Split the text into title and story (you can modify the logic as needed)
        const title = `A ${genre} Story`; // You can customize this
        const story = generatedText; // Or apply further formatting if needed

        // Send structured response
        res.json({
            title: title,
            story: story,
        });
    } catch (error) {
        console.error("Error generating story:", error);
        res.status(500).json({ error: "Failed to generate story" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
