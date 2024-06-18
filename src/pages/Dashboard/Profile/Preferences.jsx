import { Link } from "react-router-dom";

const Preferences = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Preferences</h2>
      {/* Form for updating user preferences */}
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Language</label>
          <select className="border p-2 rounded w-full">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Timezone</label>
          <select className="border p-2 rounded w-full">
            <option>GMT</option>
            <option>PST</option>
            <option>EST</option>
          </select>
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

export default Preferences;
