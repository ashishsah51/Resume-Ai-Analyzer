const express = require("express");
const router = express.Router();
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { enhanceResumePrompt } = require('../utils/promptBuilder');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    let resumeText = req.body.resumeText || "";
    let suggestionText = req.body.jdText || "";

    if (!resumeText.trim()) {
      return res.status(400).json({ error: "No resume content provided" });
    }

    const enhancedResume = await extractResumeData(resumeText, suggestionText);
    res.json({
      structuredData: enhancedResume.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

async function extractResumeData(resumeText, suggestionText) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    // This is the key change: Enforcing JSON output!
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.5,
    },
    // Optional: Configure safety settings to be less restrictive.
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const prompt = enhanceResumePrompt(resumeText, suggestionText);

  const result = await model.generateContent(prompt);
  const structuredData =  JSON.parse((await result.response).text());
  return { data: structuredData };
}

module.exports = router;
