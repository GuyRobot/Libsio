import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Nav() {
  const user = useSelector((state) => state.auth.user);

  const [showDropDown, setShowDropDown] = useState(false);

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
                <div
                  className="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static sm:inset-auto sm:ml-6 sm:pr-0
            "
                  v-if="isAuth"
                >
                  <div className="bg-gray-50 rounded-xl border border-gray-200 mr-8">
                    <button
                      type="button"
                      className="
                  flex
                  items-center
                  text-gray-400
                  hover:text-indigo-500
                  w-8
                  h-8
                  justify-center
                  relative
                "
                    >
                      <span className="sr-only">View notifications</span>
                      {/* <!-- Heroicon name: outline/bell --> */}
                      <span
                        className="
                    w-[6px]
                    h-[6px]
                    rounded-full
                    bg-indigo-600
                    absolute
                    top-[-0.125rem]
                    right-[-0.125rem]
                  "
                      ></span>
                      <span className="material-icons text-base relative">
                        notifications
                      </span>
                    </button>
                  </div>
                  <div className="z-50" click="showDropdown = !showDropdown">
                    <button
                      type="button"
                      className="
                  flex
                  items-center
                  text-gray-400
                  hover:text-indigo-500
                  w-6
                  h-6
                  justify-center
                  relative
                "
                    >
                      <span className="material-icons text-base relative">
                        {" "}
                        person{" "}
                      </span>
                    </button>
                  </div>
                  {/* <!-- Profile dropdown --> */}
                  <div className="ml-3 relative">
                    {/* <!--
                          Dropdown menu, show/hide based on menu state.

                          Entering: "transition ease-out duration-100"
                            From: "transform opacity-0 scale-95"
                            To: "transform opacity-100 scale-100"
                          Leaving: "transition ease-in duration-75"
                            From: "transform opacity-100 scale-100"
                            To: "transform opacity-0 scale-95"
                        --> */}

                    {showDropDown && (
                      <div
                        id="dropdown"
                        className="
                  origin-top-right
                  transition-all
                  duration-200
                  absolute
                  right-0
                  mt-2
                  w-56
                  rounded-md
                  shadow-lg
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                        v-if="showDropdown"
                      >
                        <div className="py-1" role="none">
                          <a
                            to="{ name: 'profile' }"
                            href=""
                            className="
                      text-gray-700
                      block
                      px-4
                      py-2
                      text-sm
                      hover:text-indigo-700
                    "
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Account settings
                          </a>
                          <a
                            to="{ name: 'profile' }"
                            className="
                      text-gray-700
                      block
                      px-4
                      py-2
                      text-sm
                      hover:text-indigo-700
                    "
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Dashboard
                          </a>
                          <form method="POST" action="" role="none">
                            <button
                              type="submit"
                              className="
                        text-gray-700
                        hover:text-indigo-700
                        block
                        w-full
                        text-left
                        px-4
                        py-2
                        text-sm
                      "
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-3"
                            >
                              Sign out
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <a to="{ name: 'register' }">
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
                    Register
                  </button>
                </a>
                <a to="{ name: 'login' }">
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
                    Login
                  </button>
                </a>
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
