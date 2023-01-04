import React, { useEffect } from "react";

import { fetchResources, approveResource } from "./adminResourceSlice";

import store from "../../../app/store";
import { useSelector } from "react-redux";
import { showConfirmPopup } from "../../../utils/utils";

import moment from "moment";
import { toast } from "react-toastify";

const AdminResources = () => {
  const resources = useSelector((state) => state.adminResource.resources);

  const approve = function (id) {
    showConfirmPopup(
      function () {
        store.dispatch(approveResource(id));
        toast.success("Succeed approve resource!")
      },
      "Do you really want to approve?",
      "Approve"
    );
  };

  useEffect(() => {
    store.dispatch(fetchResources());
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow p-4 space-y-4">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card mt-8 shadow-lg rounded-md p-8">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h2
                      className="
                    text-xl
                    font-bold
                    leading-7
                    text-gray-900
                    sm:text-2xl sm:truncate
                  "
                    >
                      Resources
                    </h2>
                    <span
                      className="
                    inline-flex
                    ml-4
                    items-center
                    justify-center
                    px-2
                    py-1
                    mr-2
                    text-xs
                    font-bold
                    leading-none
                    text-red-100
                    bg-indigo-600
                    rounded-full
                  "
                    >
                      {resources.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                      className="
                    py-2
                    align-middle
                    inline-block
                    min-w-full
                    sm:px-6
                    lg:px-8
                  "
                    >
                      <div
                        className="
                      shadow
                      overflow-hidden
                      border-b border-gray-200
                      sm:rounded-lg
                    "
                      >
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            "
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            "
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            "
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            "
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            "
                              >
                                Created At
                              </th>
                              <th
                                scope="col"
                                className="
                              px-6
                              py-3
                              text-center text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              
                            "
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {resources &&
                              resources.map((resource, idx) => (
                                <tr key={resource._id}>
                                  <td className="text-sm font-medium text-gray-900 px-6">
                                    {idx + 1}
                                  </td>
                                  <td className="text-sm font-medium text-gray-900 px-6">
                                    {resource.title}
                                  </td>
                                  <td className="text-sm text-gray-500 px-6">
                                    {resource.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {resource.status ? (
                                      <span
                                        className="
                                        px-2
                                        inline-flex
                                        text-xs
                                        leading-5
                                        font-semibold
                                        rounded-full
                                        bg-green-100
                                        text-green-800
                                        "
                                      >
                                        Active
                                      </span>
                                    ) : (
                                      <span
                                        className="
                                px-2
                                inline-flex
                                text-xs
                                leading-5
                                font-semibold
                                rounded-full
                                bg-red-100
                                text-red-800
                                "
                                      >
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td
                                    className="
                              px-6
                              py-4
                              whitespace-nowrap
                              text-sm text-gray-500
                            "
                                  >
                                    {moment(
                                      new Date(
                                        parseInt(
                                          resource._id.substring(0, 8),
                                          16
                                        ) * 1000
                                      )
                                    ).format("DD/MM/YYYYY")}
                                  </td>
                                  <td
                                    className="
                              px-6
                              py-4
                              flex
                              justify-between
                              text-right text-sm
                              font-medium
                              my-auto
                              h-full
                            "
                                  >
                                    <button
                                      className="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                                      type="button"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        style={{ width: "1em" }}
                                      >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path
                                          fill="currentColor"
                                          d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="
                                p-3
                                mx-1
                                rounded-lg
                                hover:bg-indigo-600 hover:text-white
                                text-gray-400
                              "
                                      type="button"
                                      onClick={() => approve(resource._id)}
                                    >
                                      <svg
                                        viewBox="0 0 512 512"
                                        style={{ width: "1em" }}
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
                                        ></path>
                                      </svg>
                                    </button>

                                    <button
                                      className="
                                p-3
                                mx-1
                                rounded-lg
                                hover:bg-indigo-600 hover:text-white
                                text-gray-400
                              "
                                      type="button"
                                      click="deleteModel(recruitment._id)"
                                    >
                                      <svg
                                        viewBox="0 0 448 512"
                                        style={{ width: "1em" }}
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"
                                        ></path>
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResources;
