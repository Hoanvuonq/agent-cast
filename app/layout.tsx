import { PropsWithChildren } from "react";
import "./globals.css";
import { ToastProvider } from "@/src";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="white">
      <head>
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <title>Agent CAST</title>
        <meta
          name="description"
          content="Agent CAST is an AI-powered prediction market agent built on Base and Virtuals Protocol"
        />
      </head>
      <body className="relative bg-main-background">
        <ToastProvider>
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
