import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDetails } from "../features/category/categorySlice";
import store from "../app/store";
import { Link } from "react-router-dom";

function Sidebar() {
  useEffect(() => {
    store.dispatch(fetchDetails());
  }, []);

  const categories = useSelector((state) => state.category.details);

  return (
    <div className="w-3/12 flex-shrink-0">
      <div className="overflow-hidden bg-gray-50 tabs-panel shadow-md border-r border-gray-100">
        <div className="py-5 space-y-6 sm:p-6">
          <div className="mt-4 space-y-6">
            {categories &&
              categories.map((obj, idx) => (
                <div
                  className="tab-panel group"
                  key={obj.category?.slug ?? "Uncategorized"}
                >
                  <Link
                    to={obj.category ? `?category=${obj.category?.slug}` : ""}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="
                  bg-gray-100
                  rounded-lg
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
                    w-[6px]
                    h-[6px]
                    rounded-full
                    bg-indigo-600
                    border border-gray-200
                  "
                          ></span>
                        </div>

                        <div className="ml-3 text-sm">
                          <p className="text-gray-500 capitalize group-hover:text-indigo-600">
                            {obj.category?.name ?? "Uncategorized"}
                          </p>
                        </div>
                      </div>
                      <div
                        className="
                bg-gray-100
                rounded-lg
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
                        <span className="text-xs text-indigo-600">
                          {obj.count}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <Link
            to="/user/resources/new"
            className="bg-indigo-600 disabled:bg-indigo-900 py-3 px-6 block text-center rounded-md text-white font-black text-sm my-4"
          >
            New
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
