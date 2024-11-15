import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    // Hapus data user dari localStorage
    localStorage.removeItem("user");

    // Redirect ke halaman login setelah logout
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("user");

  return (
    <>
      <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full px-10 md:ps-20 bg-white text-black">
        <nav className="container relative md:py-3 w-full md:flex md:items-center md:justify-between  mx-auto md:mx-0 lg:mx-0 py-5 pe-3 md:pe-0">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-green-700">Green</span>Hero
            </h3>

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:pointer-events-none"
                id="hs-navbar-floating-dark-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-floating-dark"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-floating-dark"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="hs-navbar-floating-dark"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
            aria-labelledby="hs-navbar-floating-dark-collapse"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-end py-2 md:py-0 md:ps-7 md:gap-5 font-semibold">
              <Link
                to={"/"}
                className="text-[16px] p-3 ps-px sm:px-3 md:py-4 text-sm text-black hover:text-green-700 focus:outline-none focus:text-neutral-300"
              >
                Home
              </Link>
              <Link
                to={"/allsharing"}
                className="text-[16px] p-3 ps-px sm:px-3 md:py-4 text-sm text-black hover:text-green-700 focus:outline-none focus:text-neutral-300"
              >
                Sharing
              </Link>
              {isLoggedIn && (
                <Link
                  to={"/createsharing"}
                  className="text-[16px] p-3 ps-px sm:px-3 md:py-4 text-sm text-black hover:text-green-700 focus:outline-none focus:text-neutral-300"
                >
                  Upload
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to={"/greenai"}
                  className="text-[16px] p-3 ps-px sm:px-3 md:py-4 text-sm text-black hover:text-green-700 focus:outline-none focus:text-neutral-300"
                >
                  Green AI
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-[16px] group items-center gap-x-2 py-2.5 px-4 bg-red-700 hover:bg-red-900 font-medium text-sm text-white rounded-lg focus:outline-none "
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="text-[16px] group inline-flex items-center gap-x-2 py-2.5 px-4 bg-green-700 hover:bg-green-900 font-medium text-sm text-white rounded-lg focus:outline-none">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
