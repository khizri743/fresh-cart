import Sidebar from '../components/Admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
        <Sidebar />
      </aside>

      {/* Admin Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Optional: Admin Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            {/* Add User Profile Dropdown here later */}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}