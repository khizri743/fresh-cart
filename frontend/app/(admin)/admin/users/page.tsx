import React from 'react';
import UsersToolbar from '../../../components/Admin/Users/UsersToolbar';
import UsersTable from '../../../components/Admin/Users/UsersTable';
import { getUsers } from '@/server/user'; // Import Server Action

const UsersPage = async () => {
  // Fetch real data from Laravel
  const users = await getUsers();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Users</h2>
          <p className="text-gray-500 mt-1">Manage admin, vendors, and customers.</p>
        </div>
        
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg transition shadow-sm flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Add New User
        </button>
      </div>

      {/* Toolbar */}
      <UsersToolbar />

      {/* Main Table with Real Data */}
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;