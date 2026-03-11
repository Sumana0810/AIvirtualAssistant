import axios from "axios"

const geminiResponse = async (command, assistantName, userName) => {
  try {

    const apiUrl = process.env.GEMINI_API_URL
    const apiKey = process.env.GEMINI_API_KEY

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You behave like a voice assistant.

Your task is to understand the user's natural language input and respond ONLY in JSON format:

{
"type": "general | google-search | youtube-search | youtube-play | get-time | get-date | get-day | get-month | calculator-open | instagram-open | facebook-open | weather-show",
"userInput": "<clean user input>",
"response": "<short voice response>"
}

Rules:
- Remove assistant name from userInput if present.
- If user asks for Google/YouTube search, userInput should contain only the search text.
- If someone asks who created you → answer ${userName}.
- Response must be short and voice-friendly.
- Return ONLY JSON.

User Input: ${command}
`

    const result = await axios.post(
      `${apiUrl}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const text = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return JSON.stringify({
        type: "general",
        userInput: command,
        response: "Sorry, I could not understand that."
      })
    }

    return text

  } catch (error) {

    console.log("Gemini API Error:", error?.response?.data || error.message)

    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "AI service is currently unavailable."
    })
  }
}

export default geminiResponse