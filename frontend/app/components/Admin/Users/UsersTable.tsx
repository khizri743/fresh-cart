import React from 'react';
import { User } from '@/server/user'; // Import shared interface

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  
  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Generate Avatar based on Name */}
                      <img 
                        className="h-10 w-10 rounded-full object-cover border border-gray-100" 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`} 
                        alt={user.name} 
                      />
                      <div>
                        <div className="font-medium text-slate-800">{user.name}</div>
                        <div className="text-gray-400 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border capitalize
                      ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : ''}
                      ${user.role === 'customer' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                      ${user.role === 'vendor' ? 'bg-orange-50 text-orange-700 border-orange-100' : ''}
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(user.created_at)}</td>
                  <td className="px-6 py-4">
                    {/* Logic: If email_verified_at exists, they are Active. Else Pending. */}
                    <span className={`flex items-center gap-1.5 text-xs font-medium
                      ${user.email_verified_at ? 'text-green-600' : 'text-gray-500'}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.email_verified_at ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                      {user.email_verified_at ? 'Verified' : 'Unverified'}
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing {users.length} users</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;