import AdminHeader from '@/components/AdminHeader';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Arcane Nexus",
  description: "Arcane Nexus Administration",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <main className="pt-4">{children}</main>
    </>
  );
}
