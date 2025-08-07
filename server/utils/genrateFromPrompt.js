import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIPalettes(promptText) {
  try {

    const prompt = `
        You are a professional color palette generator for UI/UX designers.
        Given a theme or idea: "${promptText}", generate exactly 9 palettes. Each palette is an array of exactly 5 unique hex color codes.

        Structure your output as follows:
        - First 4 palettes: dark to light shades of the given theme-based color.
        - Next 2 palettes: mix of light and dark variations (moods: soft, bold, pastel, etc.).
        - Last 3 palettes: optimized for website UI (backgrounds, text, buttons, etc.).

        Return the result in **strict JSON format only** like this:
        [
        ["#000000", "#111111", "#222222", "#333333", "#444444"],
        ...
        ]
        Do not add any extra explanation or formatting.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No text returned from Gemini");

    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        const palettes = JSON.parse(cleaned);
        return palettes;
    } catch (err) {
        console.error("AI Palette Error:", err.message);
        return null;
    }
}
