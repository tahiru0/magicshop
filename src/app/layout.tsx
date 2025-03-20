import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, Pirata_One } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";

// Load fonts
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "700", "900"],
});

const pirata = Pirata_One({
  subsets: ["latin"],
  variable: "--font-pirata",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Arcane Nexus | Forbidden Magic Shop",
  description: "Enter the gateway to forbidden artifacts and ancient spells. Only for the worthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark-magic-theme">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Pirata+One&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${cinzel.variable} ${pirata.variable} antialiased bg-magic-bg text-magic-primary relative`}
      >
        <div className="magic-overlay"></div>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
