import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - TeCalifico | ITSLP",
    default: "Home - TeCalifico | ITSLP",
  },
  description: "Califica a tus profesores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="px-0 sm:px-10 ">
            
            { children }

          </div>
      </body>
    </html>
  );
}
