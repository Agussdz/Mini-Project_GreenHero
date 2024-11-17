import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateModul() {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    gambar1: "",
    gambar2: "",
    gambar3: "",
    youtube: "",
    tanah: "",
    musimPanen: "",
    careTips: "",
    pupuk: "",
    jurnal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tanamanList, setTanamanList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);

  // Fetch data tanaman saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchTanaman = async () => {
      try {
        const response = await axios.get(
          "https://67334f6f2a1b1a4ae1130a25.mockapi.io/Tanaman"
        );
        setTanamanList(response.data);
      } catch (error) {
        setError("Gagal memuat data tanaman.");
        console.error("Error fetching data:", error);
      }
    };

    fetchTanaman();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const dataToSubmit = {
      ...formData,
      careTips: formData.careTips
        .split("\n")
        .map((tip) => tip.trim())
        .filter((tip) => tip),
    };

    try {
      const response = await axios.post(
        "https://67334f6f2a1b1a4ae1130a25.mockapi.io/Tanaman",
        dataToSubmit
      );
      setLoading(false);
      setSuccess("Tanaman berhasil ditambahkan!");
      setTanamanList([...tanamanList, response.data]);
      setFormData({
        nama: "",
        deskripsi: "",
        gambar1: "",
        gambar2: "",
        gambar3: "",
        youtube: "",
        tanah: "",
        musimPanen: "",
        careTips: "",
        pupuk: "",
        jurnal: "",
      });
    } catch (error) {
      setLoading(false);
      setError("Gagal menambahkan tanaman. Coba lagi.");
      console.error("Error posting data:", error);
    }
  };

  // Fungsi untuk menghapus tanaman
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    setDeleteStatus(null);

    try {
      await axios.delete(
        `https://67334f6f2a1b1a4ae1130a25.mockapi.io/Tanaman/${id}`
      );
      setLoading(false);
      setDeleteStatus("Tanaman berhasil dihapus!");
      // Menghapus tanaman yang dihapus dari daftar
      setTanamanList(tanamanList.filter((tanaman) => tanaman.id !== id));
    } catch (error) {
      setLoading(false);
      setError("Gagal menghapus tanaman. Coba lagi.");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 mt-20">
      <div className="container mx-auto max-w-4xl px-6 bg-white rounded-lg shadow-lg py-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">
          Tambah Tanaman
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}
        {deleteStatus && (
          <div className="text-green-600 mb-4">{deleteStatus}</div>
        )}

        {/* Form untuk menambahkan tanaman */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Nama Tanaman
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Masukkan nama tanaman"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Deskripsi tanaman"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Link YouTube (optional)
            </label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Masukkan URL YouTube"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Gambar 1
            </label>
            <input
              type="text"
              name="gambar1"
              value={formData.gambar1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="URL Gambar 1"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Gambar 2
            </label>
            <input
              type="text"
              name="gambar2"
              value={formData.gambar2}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="URL Gambar 2"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Gambar 3
            </label>
            <input
              type="text"
              name="gambar3"
              value={formData.gambar3}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="URL Gambar 3"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Tanah
            </label>
            <input
              type="text"
              name="tanah"
              value={formData.tanah}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Jenis Tanah"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Musim Panen
            </label>
            <input
              type="text"
              name="musimPanen"
              value={formData.musimPanen}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Musim Panen"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Care Tips
            </label>
            <textarea
              name="careTips"
              value={formData.careTips}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Masukkan care tips, pisahkan dengan enter"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Pupuk
            </label>
            <input
              type="text"
              name="pupuk"
              value={formData.pupuk}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Pupuk untuk tanaman"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Jurnal
            </label>
            <textarea
              name="jurnal"
              value={formData.jurnal}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Jurnal perawatan tanaman"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Sedang mengirim..." : "Tambah Tanaman"}
          </button>
        </form>

        {/* Menampilkan daftar tanaman */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-6">
            Daftar Tanaman
          </h3>
          {tanamanList.length === 0 ? (
            <p className="text-gray-500">Belum ada tanaman yang ditambahkan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tanamanList.map((tanaman) => (
                <div
                  key={tanaman.id}
                  className="bg-white p-4 rounded-lg shadow-lg space-y-4"
                >
                  <h4 className="text-xl font-semibold text-green-600">
                    {tanaman.nama}
                  </h4>
                  <div>
                    {tanaman.gambar1 && (
                      <img
                        src={tanaman.gambar1}
                        alt={tanaman.nama}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(tanaman.id)}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none"
                  >
                    {loading ? "Menghapus..." : "Hapus Tanaman"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
