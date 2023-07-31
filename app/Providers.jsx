"use client";

import { ThemeProvider } from "@wits/next-themes";
import { useEffect, useState } from "react";

const Providers = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
