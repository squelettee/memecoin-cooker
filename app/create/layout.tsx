import Navbar from "@/components/navbar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout