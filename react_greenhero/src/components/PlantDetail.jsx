import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PlantDetail() {
  const { id } = useParams();
  const apiUrl = `https://67334f6f2a1b1a4ae1130a25.mockapi.io/Sharing/${id}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data!");
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  const extractYoutubeID = (url) => {
    const match =
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
    return match ? match[1] : null;
  };

  const youtubeID = extractYoutubeID(data?.Youtube);

  return (
    <div className="bg-white min-h-screen py-12 mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <Link to={`/`}>
          <button className="font-medium text-white bg-green-600 px-5 py-2 rounded-md mb-8">
            Back
          </button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8 mb-8">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Cara perawatan untuk tanaman {data.Judul}
          </h2>

          <p className="text-lg text-gray-700 mb-8">{data.Deskripsi}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {["Gambar1", "Gambar2", "Gambar3"].map((imgKey, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={data[imgKey]}
                  alt={`Gambar ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-green-700">Watering</h3>
                  <p className="text-sm text-gray-600">
                    Proper watering techniques
                  </p>
                </div>
              </div>
            ))}
          </div>

          {youtubeID && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Video Cara Merawat {data.Judul}
              </h2>
              <div className="mt-6 ">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${youtubeID}`}
                  title="YouTube Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          )}

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Essential Plant Care Tips
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Water your plants regularly, but avoid overwatering</li>
              <li>Ensure proper drainage to prevent root rot</li>
              <li>
                Place plants in appropriate light conditions based on their
                species
              </li>
              <li>
                Maintain proper humidity levels, especially for tropical plants
              </li>
              <li>Prune dead or yellowing leaves to promote healthy growth</li>
              <li>Rotate your plants periodically to ensure even growth</li>
              <li>
                Clean leaves regularly to remove dust and improve photosynthesis
              </li>
              <li>Watch for signs of pests and treat promptly if detected</li>
            </ul>
          </section>

          <section className="bg-green-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Seasonal Care
            </h3>
            <p className="text-gray-700 mb-4">
              Remember that plant care needs may change with the seasons. During
              winter, most plants require less water and fertilizer due to
              slower growth. In spring and summer, increase watering and feeding
              to support active growth. Always monitor your plants and adjust
              care as needed.
            </p>
            <p className="text-gray-700">
              By following these guidelines and paying attention to your plants'
              specific needs, you'll be well on your way to maintaining a
              thriving indoor garden. Happy planting!
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Pemupukan
            </h3>
            <p className="text-gray-700">{data.FertilizingInstructions}</p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-lg">
              <strong>Pupuk: </strong> {data.Pupuk}
            </div>
            <div className="text-lg">
              <strong>Jurnal: </strong> {data.Jurnal}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
