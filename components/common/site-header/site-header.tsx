import { MainNav } from "@/components/navigation/main-nav/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav/mobile-nav";
import { SocialNav } from "@/components/navigation/social-nav/social-nav";
import { ThemeToggle } from "@/components/common/theme-toggle/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden items-center lg:flex">
            <SocialNav />
          </nav>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
