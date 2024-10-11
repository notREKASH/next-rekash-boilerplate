"use client";

import { globalData } from "@/data/global.data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src="/favicon.ico" alt="logo" width={32} height={32} />
        <span className="sr-only">{globalData.name}</span>
      </Link>
      {globalData.navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "hidden text-sm font-medium transition-colors hover:text-primary lg:inline-flex",
            pathname === link.href ? "text-foreground" : "text-foreground/60"
          )}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
