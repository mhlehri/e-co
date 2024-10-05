/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function LayoutPage({
  params,
}: {
  params: { hexCode: string };
}) {
  const [navbar, setNavbar] = useState<string | null>(null);
  const [footer, setFooter] = useState<string | null>(null);
  console.log(navbar, footer);
  useEffect(() => {
    // Retrieve navbar and footer from localStorage
    setNavbar(localStorage.getItem("selectedNavbar"));
    setFooter(localStorage.getItem("selectedFooter"));
  }, []);

  if (!navbar || !footer) {
    return <div>Loading...</div>;
  }

  const NavbarComponent = dynamic(
    () =>
      import(`../../../components/${navbar}`).catch(() => {
        const NavbarNotFound = () => <div>Navbar not found</div>;
        NavbarNotFound.displayName = "NavbarNotFound";
        return NavbarNotFound;
      }),

    { ssr: false }
  );
  const FooterComponent = dynamic(
    () =>
      import(`../../../components/${footer}`).catch(() => {
        const FooterNotFound = () => <div>Footer not found</div>;
        FooterNotFound.displayName = "FooterNotFound";
        return FooterNotFound;
      }),
    { ssr: false }
  );

  return (
    <div className="container mx-auto p-4">
      <NavbarComponent />
      <main className="py-8">
        <h1 className="text-2xl font-bold mb-4">
          Page with Random Hex: {params.hexCode}
        </h1>
        <p>Your selected navbar and footer are rendered here.</p>
      </main>
      <FooterComponent />
    </div>
  );
}
