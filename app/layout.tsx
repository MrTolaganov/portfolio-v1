import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ChildProps } from "@/types";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/components/providers/session.provider";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tulaganov-portfolio.uz"),
  title: "Tulaganov",
  description: "This is a portfolio website created by Otabek Tulaganov.",
  icons: { icon: "/favicon.png" },
  authors: [
    { name: "Otabek Tulaganov", url: "https://www.tulaganov-portfolio.uz" },
  ],
  openGraph: {
    title: "Tulaganov | Portfolio",
    description: "This is a portfolio website created by Otabek Tulaganov.",
    type: "website",
    url: "https://www.tulaganov-portfolio.uz",
    locale: "en_US",
    images: "https://i.postimg.cc/XYkbr4pq/Screenshot-2024-12-09-174158.png",
    countryName: "Uzbekistan",
    siteName: "Tulagnov",
    emails: "tulaganovok04@gmail.com",
  },
};

export default function RootLayout({ children }: Readonly<ChildProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased custom-scrollbar`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          <Toaster position={"bottom-center"} />
        </ThemeProvider>
      </body>
    </html>
  );
}
