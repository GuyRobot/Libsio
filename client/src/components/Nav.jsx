import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../features/share/shareSlice";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Nav() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const doSearch = (e) => {
    dispatch(search(searchQuery));
  };

  const doLogout = () => {
    dispatch(logout());
    toast.success(`Success logout! See you later`);
    navigate("/")
  };

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* <!--
                      Icon when menu is closed.

                      Heroicon name: outline/menu

                      Menu open: "hidden", Menu closed: "block"
                    --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!--
                      Icon when menu is open.

                      Heroicon name: outline/x

                      Menu open: "block", Menu closed: "hidden"
                    --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className="
              flex-1 flex
              items-center
              justify-center
              sm:items-center sm:justify-start
            "
            >
              <div className="flex-shrink-0 flex items-center w-1/6">
                <div className="relative font-black text-xl w-1/4 mr-auto">
                  <router-link to="/" className="text-gray-800">
                    Forum
                  </router-link>
                </div>
              </div>
              <div
                className="
                flex
                pl-2
                pr-4
                items-center
                bg-gray-50
                border-gray-200 border
                rounded-xl
              "
              >
                <input
                  id="name"
                  name="name"
                  v-model="name"
                  className="
                  string
                  w-full
                  text-gray-600
                  rounded-lg
                  font-medium
                  bg-gray-50
                  border-none
                  focus:outline-none focus:border-none
                  shadow-none
                  focus:shadow-none
                  placeholder-gray-400
                  text-sm
                  outline-none
                "
                  style={{ boxShadow: "none !important" }}
                  type="text"
                  autoFocus
                  placeholder="Type to search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      doSearch();
                    }
                  }}
                />
                <div
                  className="
                  bg-white
                  rounded-lg
                  cursor-pointer
                  hover:bg-gray-100
                  transition-all
                  flex
                  items-center
                  justify-center
                  ml-4
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
                >
                  <span
                    onClick={doSearch}
                    className="
                    material-icons
                    text-gray-500
                    hover:text-indigo-600
                    text-sm
                  "
                  >
                    search
                  </span>
                </div>
              </div>
              <div className="hidden sm:block sm:ml-6 mx-auto flex-grow">
                <div className="block space-x-4 w-max mx-auto">
                  <Link
                    to="/"
                    className="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                  "
                    aria-current="page"
                  >
                    Home
                  </Link>

                  <Link
                    to="/user/resources"
                    className="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                    border-b-2
                    text-gray-500
                    border-transparent
                    hover:text-gray-600 hover:border-gray-300
                    dark:text-gray-400 dark:hover:text-gray-300
                  "
                    aria-current="page"
                  >
                    Resources
                  </Link>
                </div>
              </div>
            </div>

            {user ? (
              <div>
                <button
                  onClick={doLogout}
                  className="
                  px-8
                  py-3
                  bg-indigo-600
                  hover:bg-indigo-800
                  rounded-full
                  text-xs text-white
                  font-black
                "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to="/signup">
                  <button
                    className="
                  px-8
                  py-3
                  bg-indigo-600
                  hover:bg-indigo-800
                  rounded-full
                  text-xs text-white
                  font-black
                "
                  >
                    Sign up
                  </button>
                </Link>
                <Link to="/signin">
                  <button
                    className="
                  ml-4
                  px-8
                  py-3
                  bg-indigo-600
                  hover:bg-indigo-800
                  rounded-full
                  text-xs text-white
                  font-black
                "
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="#"
              className="
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              border-b-2 border-blue-600
              active
              dark:text-blue-500 dark:border-blue-500
            "
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >
              Team
            </a>

            <a
              href="#"
              className="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >
              Projects
            </a>

            <a
              href="#"
              className="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
