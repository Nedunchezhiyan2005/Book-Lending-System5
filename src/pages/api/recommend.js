// pages/api/recommend.js
export default async function handler(req, res) {
  const { query } = req.body;

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Suggest a list of books based on this: ${query}` }],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      return res.status(500).json({ error: data.error?.message || "Gemini API error" });
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions found.";

    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
