import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({
    name: "Not set",
    email: user?.email,
    image_url: user?.photoURL
      ? user.photoURL
      : "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
    bio: "Web developer based in San Francisco.",
    address: "123 Main St, San Francisco, CA 94101",
    contactNumber: "123-456-7890",
  });

  useEffect(() => {
    async function getUser() {
      const userData = await axios.get(
        `http://localhost:5000/api/v1/users/get-with-email/${user.email}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (userData) {
        let { _id, ...fetchedData } = userData.data.data;
        setProfile({ ...profile, ...fetchedData });
      }
    }
    getUser();
  }, [user]);

  const handleProfileEditToggle = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleAddressEditToggle = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (user?.email) {
      try {
        const result = await axios.patch(
          `http://localhost:5000/api/v1/users/get-with-email/${user.email}`,
          profile,
          { headers: { authorization: `Bearer ${token}` } }
        );
      } catch (e) {
        console.log(e);
      }
    }

    setIsEditingProfile(false);
    setIsEditingAddress(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <div className="min-w-24 max-w-24 h-24 rounded-full bg-gray-200 mr-4">
            <img
              src={profile.image_url}
              alt="user profile pic"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            {isEditingProfile ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="image_url"
                  value={profile.image_url}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-2"
                />
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-2"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600 mt-2">{profile.bio}</p>
              </>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isEditingProfile ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleProfileEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit Profile
            </button>
          )}
          {isEditingProfile && (
            <button
              onClick={handleProfileEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
        {isEditingAddress ? (
          <>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="contactNumber"
              value={profile.contactNumber}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </>
        ) : (
          <>
            <p className="text-gray-600">{profile.address}</p>
            <p className="text-gray-600">{profile.contactNumber}</p>
          </>
        )}
        <div className="mt-4">
          {isEditingAddress ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleAddressEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit Address
            </button>
          )}
          {isEditingAddress && (
            <button
              onClick={handleAddressEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
