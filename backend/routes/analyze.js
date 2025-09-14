const express = require('express');
const router = express.Router();
const { analyzeResumeWithOpenAI } = require('../services/openaiAnalyzer'); // custom OpenAI logic


// Route: POST /api/analyze
router.post('/', async (req, res) => {
  try {
    const jdText = req.body.jdText || ''
    const resumeVsJob = req.body.resumeVsJJob === 'true';
    const resumeText = req.body.resumeText || '';

    // Validate input
    if (!resumeText) {
      return res.status(400).json({ error: 'Missing resume text.' });
    }

    // Call OpenAI-based analyzer (abstracted)
    const result = await analyzeResumeWithOpenAI(resumeText, jdText, resumeVsJob);

    // Return structured response
    res.json(result);

  } catch (err) {
    console.error('Error analyzing resume with OpenAI:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;