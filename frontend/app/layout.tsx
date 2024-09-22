import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header/Header";
import ToastWrapper from "./components/ToastWrapper/ToastWrapper";

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
          <main className="dark bg-default-50 h-[100vh] h-max-[100vh] overflow-hidden">
            <Header />
            {children}

            <ToastWrapper />
          </main>
        </Providers>
      </body>
    </html>
  );
}
