"use client"

import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { useLoadUserQuery } from "./redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefinSans.variable} bg-white dark:bg-gradient-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Toaster position="top-center" reverseOrder={false} toastOptions={{className: 'font-Poppins'}} />
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Custom children={children} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom:FC<{children: ReactNode}> = ({children})=>{
  const {isLoading} = useLoadUserQuery("");
  return (
    <>
      {
        isLoading ? <Loader /> : <>{children}</>
      }
    </>
  )
}