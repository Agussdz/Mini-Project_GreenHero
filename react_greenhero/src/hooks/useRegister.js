import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Swal from "sweetalert2";

export default function useRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Registrasi dengan email dan password menggunakan Supabase
    const { user, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: signupError.message,
      });
      return;
    }

    // Insert username ke dalam tabel users setelah berhasil sign up
    const { data, error: insertError } = await supabase
      .from("users")
      .insert([{ username, email }]);

    if (insertError) {
      setError(insertError.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan Data",
        text: insertError.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Akun Anda berhasil didaftarkan. Silakan login.",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    error,
    setError,
  };
}
