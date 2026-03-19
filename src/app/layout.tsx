import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import AntiDevTools from "@/components/security/AntiDevTools";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { theme } from "@/theme/antd";
import { hindSiliguriFonts, baiJamjuree } from "@/app/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Xinzo - Multi Products ",
    template: "%s | Xinzo",
  },
  description: "Xinzo - Premium T-shirt brand. Shop quality menswear and stylish apparel.",
  keywords: ["t-shirt", "menswear", "apparel", "Xinzo", "fashion", "clothing"],
  authors: [{ name: "Xinzo" }],
  creator: "Xinzo",
  openGraph: {
    title: "Xinzo - Multi Products ",
    description: "Xinzo - Premium T-shirt brand. Shop quality menswear and stylish apparel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xinzo - Multi Products ", 
    description: "Xinzo - Premium T-shirt brand. Shop quality menswear and stylish apparel.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </head>
        <body className={`${hindSiliguriFonts.variable} ${baiJamjuree.variable} font-baiJamjuree antialiased bg-gradient-to-br from-white to-primary/5 text-black`}>
          <AntiDevTools />
          <AuthProvider>
            <Toaster />
            <CartProvider>
              <AntdRegistry>
                <Header />
                <FlashSaleBanner />
                <div className="min-h-screen">{children}</div>
                <Footer />
                <BottomNav />
              </AntdRegistry>
            </CartProvider>
          </AuthProvider>
        </body>
      </html>
    </ConfigProvider>
  );
}
