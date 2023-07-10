import "./globals.css";

import Providers from "./Providers";

import { Josefin_Sans } from "next/font/google";

const js = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Todo DnD",
  description: "FrontEnd Mentor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Providers>
        <body className={`${js.className} h-fit`}>{children}</body>
      </Providers>
    </html>
  );
}
