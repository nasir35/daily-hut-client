import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faBell,
  faLock,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileSettings = () => {
  const { logOut } = useAuth();

  const [userDetails, setuserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    image_url: "https://via.placeholder.com/150",
    role: "member",
  });
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/users/get-with-email/${user?.email}`
        );
        if (response.status === 200) {
          setuserDetails((d) => ({
            ...d,
            ...response?.data.data,
          }));
        } else {
          // Handle other status codes
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <img
            src={userDetails.image_url}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{userDetails.name}</h2>
            <p className="text-gray-600">{userDetails.email}</p>
            <div className="mt-2 flex items-center">
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                  userDetails?.role === "member"
                    ? "bg-blue-100 text-blue-800"
                    : userDetails?.role === "shopkeeper"
                    ? "bg-green-100 text-green-800"
                    : userDetails?.role === "admin"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    userDetails.role === "member"
                      ? "bg-blue-500"
                      : userDetails.role === "shopkeeper"
                      ? "bg-green-500"
                      : userDetails.role === "admin"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                ></span>
                {userDetails.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <ul className="space-y-4">
          <li>
            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <Link to="/dashboard/settings/account">Account</Link>
            </button>
          </li>
          <li>
            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              <Link to="/dashboard/settings/password">Change Password</Link>
            </button>
          </li>
          <li>
            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              <Link to="/dashboard/settings/preferences">Preferences</Link>
            </button>
          </li>
          <li>
            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              <Link to="/dashboard/settings/notifications">
                Notifications setting
              </Link>
            </button>
          </li>

          <li>
            <button
              className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={logOut}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettings;
