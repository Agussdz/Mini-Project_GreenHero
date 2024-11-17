import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../services/supabaseClient";

export default function CreateSharing() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Mengecek user dari localstorage dan menampilkan postingan dari user tersebut
  useEffect(() => {
    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User  not found in localStorage");
        return;
      }
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user.id);
        if (error) {
          console.error("Error fetching posts:", error);
        }
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError("Error Fetching Data");
      }
    };
    fetchPosts();
  }, []);

  // Menangani submit form untuk insert dan update
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.error("User not found in localStorage");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Upload it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let imageUrl = null;

        if (imageFile) {
          const fileName = `${Date.now()}_${imageFile.name}`;
          const { data, error: uploadError } = await supabase.storage
            .from("post_images")
            .upload(fileName, imageFile, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            Swal.fire({
              title: "Error",
              text:
                "There was an issue uploading the image: " +
                uploadError.message,
              icon: "error",
            });
            return;
          }
          imageUrl = `https://jpastodrmlhmaqbpikxd.supabase.co/storage/v1/object/public/post_images/${fileName}`;
        } else if (editingPost) {
          const existingPost = posts.find((post) => post.id === editingPost);
          if (existingPost && existingPost.images) {
            imageUrl = existingPost.images;
          }
        }

        if (editingPost) {
          const { error } = await supabase
            .from("posts")
            .update({
              category: selectedCategory,
              topic: selectedTopic,
              content: content,
              images: imageUrl,
            })
            .eq("id", editingPost);

          if (error) {
            Swal.fire({
              title: "Error",
              text: "There was an issue while updating: " + error.message,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Updated",
              text: "Your post has been updated successfully.",
              icon: "success",
            });
          }
        } else {
          const { data, error } = await supabase.from("posts").insert([
            {
              user_id: user.id,
              category: selectedCategory,
              topic: selectedTopic,
              content: content,
              images: imageUrl,
            },
          ]);
          if (error) {
            Swal.fire({
              title: "Error",
              text: "There was an issue while posting: " + error.message,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Uploaded",
              text: "Your post has been uploaded successfully.",
              icon: "success",
            });
            setSelectedCategory("");
            setSelectedTopic("");
            setContent("");
            setImageFile(null);
          }
        }

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  // Menangkap data postingan agar bisa di edit
  const handleEdit = async (post) => {
    setSelectedCategory(post.category);
    setSelectedTopic(post.topic);
    setContent(post.content);
    setEditingPost(post.id);
  };

  // Fungsi untuk menghapus postingan
  const handleDelete = async (postId) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .select();

      if (error) {
        Swal.fire({
          title: "Error",
          text: "There was an issue deleting the post: " + error.message,
          icon: "error",
        });
      } else {
        setPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      setError("Fail to delete");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-12 mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {editingPost ? "Edit Post" : "Create a New Post"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Category</option>
              <option value="Informasi">Informasi</option>
              <option value="Edukasi">Edukasi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Topic</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Tanaman">Tanaman</option>
              <option value="Tanah">Tanah</option>
              <option value="Panen">Panen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
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
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            {editingPost ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      {/* Table */}
      <div className="mt-12 mx-auto max-w-4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {post.topic}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-[100px] md:max-w-[200px]">
                    {post.content}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {post.images && (
                      <img
                        src={post.images}
                        alt={post.username}
                        className="max-w-[60px] h-[50px] object-cover rounded-lg"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-blue-600 text-white py-2 px-3 rounded-md me-1 mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-600 text-white py-2 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
