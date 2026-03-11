// backend/controllers/aiController.js
import geminiResponse from '../gemini.js' // your existing Gemini.js file

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    if (!command) return res.status(400).json({ response: "No input provided" });

    // Call your Gemini.js function
    const response = await geminiResponse(command);

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "Something went wrong" });
  }
};