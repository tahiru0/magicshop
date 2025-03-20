import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Cart />
      <Footer />
    </>
  );
}
