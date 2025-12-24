import React from 'react';

const UsersTable = () => {
  // Mock Data for Users
  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      role: "Admin",
      joinDate: "Jan 12, 2023",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      role: "Customer",
      joinDate: "Feb 04, 2023",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      role: "Customer",
      joinDate: "Mar 22, 2023",
      status: "Inactive",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Linda Taylor",
      email: "linda.t@example.com",
      role: "Vendor",
      joinDate: "Apr 15, 2023",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
                    <div>
                      <div className="font-medium text-slate-800">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border
                    ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : ''}
                    ${user.role === 'Customer' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                    ${user.role === 'Vendor' ? 'bg-orange-50 text-orange-700 border-orange-100' : ''}
                  `}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium
                    ${user.status === 'Active' ? 'text-green-600' : 'text-gray-500'}
                  `}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-green-600 mr-3 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing 1 to 4 of 128 users</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50">Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;