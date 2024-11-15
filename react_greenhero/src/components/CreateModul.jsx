import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateModul() {
  const apiUrl = "https://67334f6f2a1b1a4ae1130a25.mockapi.io/Sharing";

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Judul: "",
    Deskripsi: "",
    Gambar1: "",
    Gambar2: "",
    Gambar3: "",
    Gambar4: "",
    Youtube: "",
    Pupuk: "",
    Jurnal: "",
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios
        .put(`${apiUrl}/${currentId}`, formData)
        .then((response) => {
          setData(
            data.map((item) =>
              item.id === currentId ? { ...item, ...formData } : item
            )
          );
          setEditing(false);
          setFormData({
            Judul: "",
            Deskripsi: "",
            Gambar1: "",
            Gambar2: "",
            Gambar3: "",
            Gambar4: "",
            Youtube: "",
            Pupuk: "",
            Jurnal: "",
          });
        })
        .catch((error) => {
          console.error("Error editing data:", error);
        });
    } else {
      axios
        .post(apiUrl, formData)
        .then((response) => {
          setData([...data, response.data]);
          setFormData({
            Judul: "",
            Deskripsi: "",
            Gambar1: "",
            Gambar2: "",
            Gambar3: "",
            Gambar4: "",
            Youtube: "",
            Pupuk: "",
            Jurnal: "",
          });
        })
        .catch((error) => {
          console.error("Error adding data:", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleEdit = (item) => {
    setFormData({
      Judul: item.Judul,
      Deskripsi: item.Deskripsi,
      Gambar1: item.Gambar1,
      Gambar2: item.Gambar2,
      Gambar3: item.Gambar3,
      Gambar4: item.Gambar4,
      Youtube: item.Youtube,
      Pupuk: item.Pupuk,
      Jurnal: item.Jurnal,
    });
    setEditing(true);
    setCurrentId(item.id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Manage Content
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-2xl mb-4">
          {editing ? "Edit Content" : "Add Content"}
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="Judul"
              className="block text-sm font-medium text-gray-700"
            >
              Judul
            </label>
            <input
              type="text"
              id="Judul"
              name="Judul"
              value={formData.Judul}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="Deskripsi"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>
            <textarea
              id="Deskripsi"
              name="Deskripsi"
              value={formData.Deskripsi}
              onChange={handleInputChange}
              required
              rows="4"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {["Gambar1", "Gambar2", "Gambar3"].map((gambar, index) => (
            <div key={index}>
              <label
                htmlFor={gambar}
                className="block text-sm font-medium text-gray-700"
              >
                {gambar} URL
              </label>
              <input
                type="text"
                id={gambar}
                name={gambar}
                value={formData[gambar]}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          {["Youtube", "Pupuk", "Jurnal"].map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            {editing ? "Update Content" : "Add Content"}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{item.Judul}</h3>
            <p className="text-gray-700 mb-4">{item.Deskripsi}</p>

            <div className="space-y-2">
              {[item.Gambar1, item.Gambar2, item.Gambar3, item.Gambar4].map(
                (src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Gambar ${i + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )
              )}
            </div>

            <p className="mt-4">Youtube: {item.Youtube}</p>
            <p>Pupuk: {item.Pupuk}</p>
            <p>Jurnal: {item.Jurnal}</p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
