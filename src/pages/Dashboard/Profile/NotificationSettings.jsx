import { Link } from "react-router-dom";

const NotificationSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
      {/* Form for updating notification settings */}
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email Notifications</label>
          <input type="checkbox" className="border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">SMS Notifications</label>
          <input type="checkbox" className="border p-2 rounded" />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <Link
            to={"/dashboard/settings"}
            className="btn btn-neutral min-w-[150px]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;
