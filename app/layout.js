import "./globals.css";
import {DataProvider}  from '../utiles/mapDataContext'
import Header from '../components/Header'

export const metadata = {
  title: "AAU Campus Navigator",
  description: "Computer Science Student Project",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body  className="bg-white"
      >
        <DataProvider>
          <Header/>
        {children}
        </DataProvider>
      </body>
    </html>
  );
}
