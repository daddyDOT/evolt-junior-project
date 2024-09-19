import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./components/Providers";
import { ToastContainer } from "react-toastify";

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
            {children}

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              stacked
              theme="colored"
            />
          </main>
        </Providers>
      </body>
    </html>
  );
}
