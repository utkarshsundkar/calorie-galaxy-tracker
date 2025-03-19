
const API_KEY = "AIzaSyBMrbfHkSND7MOCo0ML1GifyppVLZAC70o";
// Updated to use the correct model name with v1 API
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function analyzeFoodWithGemini(foodDescription: string): Promise<string> {
  try {
    const prompt = `
      You are a nutrition expert. 
      Analyze the following food and provide the calorie count and macronutrients.
      Return your response in JSON format with these fields: 
      {
        "calories": number,
        "protein": number (in grams),
        "carbs": number (in grams),
        "fat": number (in grams),
        "foodName": string (a clean name for this food item)
      }
      
      Only return the JSON. Food description: ${foodDescription}
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error("Failed to analyze food");
    }

    const responseText = data.candidates[0]?.content?.parts[0]?.text || "";
    return responseText;
  } catch (error) {
    console.error("Error analyzing food:", error);
    throw error;
  }
}
