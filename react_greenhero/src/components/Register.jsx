import React from "react";
import Greenplant from "../assets/undraw_explore_re_8l4v.svg";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    error,
  } = useRegister();

  return (
    <div>
      <div className="font-[sans-serif] mt-8">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Register
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Register to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>

                {/* Input untuk Username */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-green-600"
                      placeholder="Enter user name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Input untuk Email */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-green-600"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Input untuk Password */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-green-600"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tombol Register */}
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    Register
                  </button>
                </div>

                {/* Link ke halaman Login */}
                <p className="text-sm !mt-8 text-center text-gray-800">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>

            {/* Gambar */}
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 hidden md:block lg:block">
              <img
                src={Greenplant}
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
