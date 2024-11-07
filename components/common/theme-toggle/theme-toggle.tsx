"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, ComputerIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const items = [
    {
      name: "Clair",
      icon: SunIcon,
      onClick: () => setTheme("light"),
    },
    {
      name: "Sombre",
      icon: MoonIcon,
      onClick: () => setTheme("dark"),
    },
    {
      name: "Système",
      icon: ComputerIcon,
      onClick: () => setTheme("system"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="w-10 px-0">
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Changer de thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.name}
            className="flex items-center gap-2"
            onClick={item.onClick}>
            <item.icon className="size-4" /> {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
