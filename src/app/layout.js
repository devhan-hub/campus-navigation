import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// pages/_app.js
import Header from "@/components/header";


export  function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " AAU CAMPUS NAVIGATOR",
  description: "computer science students project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        
      </body>
    </html>
  );
}
