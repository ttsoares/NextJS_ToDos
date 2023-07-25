import "./globals.css";

import { ServerThemeProvider } from "@wits/next-themes";
import Providers from "./Providers";

import { Josefin_Sans } from "next/font/google";

const js = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Todo DnD",
  description: "FrontEnd Mentor",
};

export default function RootLayout({ children }) {
  return (
    <ServerThemeProvider>
      <html lang="en">
        <body className={`${js.className} w-full h-fit`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
