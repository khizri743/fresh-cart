'use client'; // Switch to Client Component to check Auth

import Sidebar from '../components/Admin/Sidebar';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error } = useAuth({ middleware: 'auth' });
  const router = useRouter();

  useEffect(() => {
    // If user is loaded (exists) but role is NOT admin, kick them out
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  // While checking auth, you might want to show a loader
  if (!user && !error)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  // Don't render admin layout for non-admins to prevent flashing content
  if (user?.role !== 'admin') return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
        <Sidebar />
      </aside>

      {/* Admin Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 text-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}
