import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import LoadingScreen from "@/components/layout/LoadingScreen";
import DataLoader from "@/components/layout/DataLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanResponse.AI | Smart City Decision Support",
  description: "Advanced AI-powered urban response coordination platform for Chennai City.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0515] overflow-hidden`}>
        <DataLoader />
        <LoadingScreen />
        <div className="flex min-h-screen relative overflow-hidden">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto max-h-screen">
            <div className="max-w-7xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_forwards] pointer-events-auto">
              {children}
            </div>
          </main>

          {/* Animated Background Gradients */}
          <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-deep-purple/10 blur-[150px] -z-10 animate-pulse pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] bg-neon-purple/5 blur-[120px] -z-10 pointer-events-none" />
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </body>
    </html>
  );
}

