"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const navbars = ["Navbar1", "Navbar2"];
const footers = ["Footer1", "Footer2"];

function generateRandomHexCode() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export default function SelectLayout() {
  const [selectedNavbar, setSelectedNavbar] = useState("");
  const [selectedFooter, setSelectedFooter] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNavbar && selectedFooter) {
      // Store the selected navbar and footer in localStorage
      localStorage.setItem("selectedNavbar", selectedNavbar);
      localStorage.setItem("selectedFooter", selectedFooter);

      // Generate random hex code and navigate to the new route
      const randomHex = generateRandomHexCode();
      router.push(`/layout/${randomHex}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Navbar and Footer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block mb-2">Select Navbar:</label>
          <select
            value={selectedNavbar}
            onChange={(e) => setSelectedNavbar(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">-- Select Navbar --</option>
            {navbars.map((navbar) => (
              <option key={navbar} value={navbar}>
                {navbar.charAt(0).toUpperCase() + navbar.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Select Footer:</label>
          <select
            value={selectedFooter}
            onChange={(e) => setSelectedFooter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">-- Select Footer --</option>
            {footers.map((footer) => (
              <option key={footer} value={footer}>
                {footer.charAt(0).toUpperCase() + footer.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Create Page
        </button>
      </form>
    </div>
  );
}
