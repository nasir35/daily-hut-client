const UserTable = ({ users, editFunc }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Username
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user._id}>
            <td className="px-4 py-4 whitespace-nowrap">
              {user.name ? user.name : "Not set"}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-4 py-4 whitespace-nowrap">{user.role}</td>
            <td className="px-4 py-4 text-right whitespace-nowrap">
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => editFunc(user)}
              >
                Edit role
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
