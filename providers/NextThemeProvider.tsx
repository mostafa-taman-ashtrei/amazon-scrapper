"use client";

import { ThemeProvider } from "next-themes";

interface props {
    children: React.ReactNode
}

const NextThemeProvider: React.FC<props> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
            {children}
        </ThemeProvider>
    );
};

export default NextThemeProvider;
