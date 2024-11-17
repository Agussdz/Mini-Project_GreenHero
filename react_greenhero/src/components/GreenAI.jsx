import React, { useState } from "react";
import {
  uploadImage,
  generateContentFromImage,
  generateContentFromText,
} from "../services/ImageAnalyzer";
import { marked } from "marked";

export default function GreenAI() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageBase64(null);
      setUploadSuccess(false);
    }
  };

  const handleUploadImage = async () => {
    if (image) {
      try {
        const base64Image = await uploadImage(image);
        setImageBase64(base64Image);
        setUploadSuccess(true);

        const userMessage = {
          text: "Image uploaded",
          sender: "user",
          image: base64Image,
        };
        setHistory((prev) => [...prev, userMessage]);
      } catch (error) {
        setUploadSuccess(false);
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setHistory((prev) => [...prev, userMessage]);

    setLoading(true);

    let aiResponse;

    if (imageBase64) {
      const prompt = `Anda adalah seorang ahli tanaman dan pertanian. Tugas Anda adalah menganalisis gambar yang diberikan dan memberikan informasi mengenai pertanian seperti tanah, lahan, jenis tanaman, waktu panen, atau hama tanaman yang ada pada gambar tersebut. Berikan saran dan penjelasan dan langkah-langkah pengendaliannya. Gambar yang diberikan adalah: ${input}`;
      aiResponse = await generateContentFromImage(imageBase64, prompt);
    } else {
      const prompt = `Anda adalah seorang ahli tanaman dan pertanian. Tugas Anda adalah memberikan informasi  mengenai pertanian seperti tanah, lahan, jenis tanaman, waktu panen, atau hama tanaman berdasarkan deskripsi tersebut: ${input}. Berikan saran dan penjelasan serta langkah-langkah pengendaliannya.`;
      aiResponse = await generateContentFromText(prompt);
    }

    const aiMessage = { text: aiResponse, sender: "ai" };
    setHistory((prev) => [...prev, aiMessage]);

    setInput("");
    setImage(null);
    setImageBase64(null);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[70%] h-[90%]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Chatbot AI for Plant Analysis
        </h2>

        <div className="h-[65%] md:h-[70%] overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4">
          {history.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div className={`inline-block p-2 rounded-lg`}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: msg.sender === "ai" ? marked(msg.text) : msg.text,
                  }}
                />

                {msg.image && (
                  <div
                    className={`mt-2 ${
                      msg.sender === "user" ? "flex justify-end" : ""
                    }`}
                  >
                    <img
                      src={msg.image}
                      alt="User uploaded"
                      className="max-w-[200px] rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-2">
              <span className="inline-block p-2 rounded-lg bg-green-50 text-black">
                Loading...
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 flex gap-5 items-center">
          <input
            type="file"
            onChange={handleImageChange}
            className="text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-green-600 file:text-white
        hover:file:bg-green-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400
      "
          ></input>
          {image && (
            <div className="mt-2 flex justify-center items-center gap-5">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-[70px] max-h-[70px] rounded-md"
              />
              <div>
                <button
                  onClick={handleUploadImage}
                  className="bg-green-600 text-white rounded-lg py-2 px-4"
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input dan submit */}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan pertanyaan anda..."
            className="border border-gray-300 rounded-lg p-2 flex-grow mr-2 outline-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg px-4"
            disabled={!input.trim()}
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
