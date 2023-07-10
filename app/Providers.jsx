"use client";

import { ThemeProvider } from "next-themes";

const Providers = ({ children }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="themed">
      <div suppressHydrationWarning={true}>{children}</div>
    </ThemeProvider>
  );
};

export default Providers;
