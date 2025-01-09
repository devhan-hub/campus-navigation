import type { Metadata } from "next";
import "./globals.css";
import {DataProvider}  from '../utiles/mapDataContext'


export const metadata: Metadata = {
  title: "AAU Campus Navigator",
  description: "Computer Science Student Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
        <DataProvider>
        {children}
        </DataProvider>
      </body>
    </html>
  );
}
