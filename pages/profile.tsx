import { useState } from "react";
import { Edit, User, Mail, Phone, MapPin, Camera } from "lucide-react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    avatar: "/default-avatar.png", // Gambar profil default
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full border-4 border-gray-300 dark:border-gray-600" />
          <button className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full text-white shadow-md hover:bg-teal-600">
            <Camera size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">User Profile</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
          >
            <Edit size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <User className="text-gray-500 dark:text-gray-300" />
            {editMode ? (
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full dark:text-white"
              />
            ) : (
              <p className="text-lg font-medium dark:text-white">{userInfo.name}</p>
            )}
          </div>
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <Mail className="text-gray-500 dark:text-gray-300" />
            {editMode ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full dark:text-white"
              />
            ) : (
              <p className="text-lg dark:text-white">{userInfo.email}</p>
            )}
          </div>
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <Phone className="text-gray-500 dark:text-gray-300" />
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full dark:text-white"
              />
            ) : (
              <p className="text-lg dark:text-white">{userInfo.phone}</p>
            )}
          </div>
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <MapPin className="text-gray-500 dark:text-gray-300" />
            {editMode ? (
              <input
                type="text"
                name="location"
                value={userInfo.location}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full dark:text-white"
              />
            ) : (
              <p className="text-lg dark:text-white">{userInfo.location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
