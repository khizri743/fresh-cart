import Navbar from '../components/User/Navbar'
import Footer from '../components/User/Footer'
import { get as getUsers } from '@/server/user'; // Renamed import to 'getUsers' for clarity

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 1. Fetch the list of users
  let users:any[] = [];
  try {
     users = await getUsers(); 
  } catch (e) {
     // If API fails, users remains empty
     console.error("Failed to fetch users", e);
  }

  // 2. Extract the first user to simulate a "Logged In" state
  // (In the future, you will replace this with a call to fetch the specific authenticated user)
  const currentUser = users && users.length > 0 ? users[0] : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 3. Pass the SINGLE user (currentUser) to Navbar, not the array */}
      <Navbar user={currentUser} />

      <main className="flex-grow bg-gray-50">
        {children}
      </main>

      <Footer />
    </div>
  )
}