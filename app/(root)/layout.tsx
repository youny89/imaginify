import MobileNav from "@/components/shared/mobile-nav"
import Sidebar from "@/components/shared/sidebar"

const Layout = ({children}:{ children:React.ReactNode}) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row border-4 border-purple-600">
      <Sidebar />
      <MobileNav />

      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10 border-4 border-rose-500">
          <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 ">
            {children}  
          </div>
        </div>
    </main>
  )
}

export default Layout