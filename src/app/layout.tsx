import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import Provider from "./_components/Provider";
import Navbar from "./_components/Layout/Navbar/Navbar";
import MobileNavbar from "./_components/Layout/Navbar/MobileNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Provider>
            <Navbar />
              {children}
            <MobileNavbar />
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
