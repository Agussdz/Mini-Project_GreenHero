import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function AllSharing() {
  const [posts, setPosts] = useState([]);

  // Fetching data dari postingan dari supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, category, topic, content, posted_at, images, users(username)"
        )
        .order("posted_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 ">
        <div className="max-w-4xl mx-auto space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start space-x-3 px-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.users.username}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {post.category} • {post.topic}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.posted_at).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-800">{post.content}</p>
                  <div className="mt-4 grid md:grid-cols-3 gap-2">
                    {post.images && (
                      <img
                        src={post.images}
                        alt={post.username}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
