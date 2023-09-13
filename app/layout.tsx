import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import RecoilRootProvider from "@/components/providers/recoil-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Chat Application",
  description: "Discord Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <RecoilRootProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <SocketProvider>
                <ModalProvider />
                {children}
              </SocketProvider>
            </ThemeProvider>
          </RecoilRootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
