import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Swal from "sweetalert2";

export default function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mencari user berdasarkan username terlebih dahulu
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, username, email")
      .eq("username", username)
      .single();

    if (userError || !userData) {
      Swal.fire({
        icon: "error",
        title: "Username tidak ditemukan",
        text: "Pastikan username yang Anda masukkan benar.",
      });
      return;
    }

    // Lakukan login dengan email dan password setelah username ditemukan
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: error.message,
      });
      return;
    }

    // Simpan data user ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // arahkan ke halaman utama
    Swal.fire({
      icon: "success",
      title: "Login berhasil!",
      text: "Selamat datang, Anda berhasil login.",
    }).then(() => {
      navigate("/");
    });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };
}
