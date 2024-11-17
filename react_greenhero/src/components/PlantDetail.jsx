import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PlantDetail() {
  const { id } = useParams();
  const apiUrl = `https://67334f6f2a1b1a4ae1130a25.mockapi.io/Tanaman/${id}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
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

  const youtubeID = extractYoutubeID(data?.youtube);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <Link to={`/tanaman`}>
          <button className="font-medium text-white bg-green-600 px-5 py-2 rounded-md mb-8">
            Back
          </button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8 mb-8">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            {data.nama}
          </h2>

          <p className="text-lg text-gray-700 mb-8 text-justify">
            {data.deskripsi}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {["gambar1", "gambar2", "gambar3"].map((imgKey, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={data[imgKey]}
                  alt={`Gambar ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>

          {youtubeID && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Video Cara Merawat {data.nama}
              </h2>
              <div className="mt-6">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${youtubeID}`}
                  title="YouTube Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-md w-full h-40 md:h-96"
                ></iframe>
              </div>
            </div>
          )}

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Tips Perawatan
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {data.careTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="bg-green-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Musim
            </h3>
            <p className="text-gray-700">Musim Panen: {data.musimPanen}</p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Tanah
            </h3>
            <p className="text-gray-700">Tanah: {data.tanah}</p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Pemupukan
            </h3>
            <p className="text-gray-700">{data.pupuk}</p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Jurnal
            </h3>
            <a
              href={data.jurnal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Klik untuk melihat jurnal
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
