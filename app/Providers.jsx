"use client";

import { ThemeProvider } from "@wits/next-themes";

const Providers = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
