import Navbar from '../components/User/Navbar'
import Footer from '../components/User/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 
         Navbar now handles authentication internally using the useAuth hook.
         No props are needed here.
      */}
      <Navbar />

      <main className="flex-grow bg-gray-50">
        {children}
      </main>

      <Footer />
    </div>
  )
}