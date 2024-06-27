// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 80;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function getFakeFact() {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = "Create a completely false fact that sounds somewhat believable. Ensure that the fact is 100% fictional and has no basis in reality. Do not use any formatting and respond with only the fact.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

app.get('/fake-fact', async (req, res) => {
    try {
        const fakeFact = await getFakeFact();
        res.json({ fakeFact });
    } catch (error) {
        res.status(500).json({ error: 'Error generating fake fact' });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
