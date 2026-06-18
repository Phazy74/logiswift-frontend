import { Navbar } from "../../components/client/navbar/Navbar";
import { Footer } from "../../components/client/footer/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}