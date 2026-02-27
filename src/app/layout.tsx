import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Talent Ops Dashboard | Andela",
  description: "Internal tools for talent operation management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, "font-sans bg-slate-50 text-slate-900 min-h-screen antialiased")}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col md:pl-64">
            <Topbar />
            <main className="flex-1 min-h-[calc(100vh-5rem)]">
              <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
