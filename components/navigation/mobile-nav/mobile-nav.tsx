"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { globalData } from "@/data/global.data";
import { MenuIcon } from "lucide-react";
import { MobileLink } from "@/components/navigation/mobile-link/mobile-link";
import Link from "next/link";
import Image from "next/image";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 px-0 lg:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-4">
        <MobileLink
          href="/"
          onOpenChange={setOpen}
          className="mr-6 flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={32}
            height={32}
            loading="eager"
          />
          <span className="font-bold">{globalData.name}</span>
        </MobileLink>
        <div className="mt-10 flex flex-col gap-2">
          {globalData.navLinks.map((link) => (
            <MobileLink key={link.href} href={link.href} onOpenChange={setOpen}>
              {link.name}
            </MobileLink>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-4">
          {globalData.socialLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.icon && <link.icon className="size-5" />}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
