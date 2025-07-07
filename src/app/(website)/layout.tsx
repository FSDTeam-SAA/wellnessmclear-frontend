import type React from "react";
// import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";


// export const metadata: Metadata = {
//   title: "Lawbie Dashboard",
//   description: "Multi-role ecommerce dashboard",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Navbar />
      
      {children}
      <Footer/>
    </main>
  );
}
