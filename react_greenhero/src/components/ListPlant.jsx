import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Pastikan axios sudah terinstall
import CreateModul from "./CreateModul";

export default function ListPlant() {
  const [plantData, setPlantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://67334f6f2a1b1a4ae1130a25.mockapi.io/Sharing"
        );
        setPlantData(response.data);
      } catch (err) {
        setError("Error Fetching");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/createmodul`}>
        <button className="font-medium text-white bg-green-600 px-5 py-2 rounded-md mb-4">
          Buat Modul
        </button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {plantData.map((item) => (
          <div
            key={item.id}
            className="max-w-sm lg:max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="w-full h-48 object-cover"
              src={item.Gambar1}
              alt="Agriculture"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.Judul}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 truncate">
                {item.Deskripsi}
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
