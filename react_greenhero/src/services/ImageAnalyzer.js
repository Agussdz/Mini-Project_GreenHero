import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const uploadImage = async (imageFile) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const generateContentFromImage = async (imageBase64, prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(",")[1],
          mimeType: "image/jpeg",
        },
      },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    return "Terjadi kesalahan dalam memproses gambar.";
  }
};

export const generateContentFromText = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([prompt]);

    return result.response.text();
  } catch (error) {
    console.error("Error generating content from text:", error);
    return "Terjadi kesalahan dalam memproses teks.";
  }
};
