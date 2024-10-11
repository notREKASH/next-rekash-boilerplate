import { globalData } from "@/data/global.data";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {globalData.socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer">
              <span className="sr-only">{link.name}</span>
              {link.icon && <link.icon className="size-5" />}
            </Link>
          ))}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <Link href={globalData.personalSite} target="_blank" rel="noreferrer">
            {globalData.author} &copy; {new Date().getFullYear()}
            <span className="sr-only">Personal site</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
