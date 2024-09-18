import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "Messaging app",
  description: "Evolt junior project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="dark">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
