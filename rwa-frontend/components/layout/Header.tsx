"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2C2F36] bg-[#181A20]">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/window.svg"
                alt="Logo"
                width={24}
                height={24}
                className="text-[#00FFFF]"
              />
              <span className="font-bold text-[#00FFFF]">NeuroMint</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors"
              >
                AI Marketplace
              </Link>
              <Link
                href="/tokenize"
                className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors"
              >
                Tokenize Asset
              </Link>
              <Link
                href="/transfer"
                className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors"
              >
                License Transfer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}