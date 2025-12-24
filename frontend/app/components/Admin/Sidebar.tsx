import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <span className="text-xl font-bold text-white">Admin Panel</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Dashboard
        </Link>
        <Link href="/admin/products" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Products
        </Link>
        <Link href="/admin/orders" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Orders
        </Link>
        <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Users
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;