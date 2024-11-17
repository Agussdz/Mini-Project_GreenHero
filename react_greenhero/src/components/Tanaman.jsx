import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Sprout } from "lucide-react";

export default function Tanaman() {
  const [plantData, setPlantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://67334f6f2a1b1a4ae1130a25.mockapi.io/Tanaman"
        );
        setPlantData(response.data);
      } catch (err) {
        setError("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 ">
      {loading && <div className="text-center text-xl">Loading...</div>}
      {error && <div className="text-center text-red-700">{error}</div>}
      <h2 className="text-3xl py-12 font-semibold text-center flex items-center justify-center">
        <Sprout className="mr-2 text-green-600 h-8 w-8" />
        <span>Daftar</span>
        <span className="ml-1 text-green-600">Tanaman</span>{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {plantData.map((item) => (
          <div
            key={item.id}
            className="max-w-sm lg:max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="w-full h-48 object-cover"
              src={item.gambar1}
              alt={item.nama}
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.nama}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mt-2 truncate">
                {item.deskripsi}
              </p>

              <div className="mt-4 flex justify-start">
                <Link to={`/plant/${item.id}`}>
                  <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
