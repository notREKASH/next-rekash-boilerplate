import { buttonVariants } from "@/components/ui/button";
import { globalData } from "@/data/global.data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const SocialNav = ({ className }: { className?: string }) => {
  return (
    <>
      {globalData.socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer">
          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "size-10 px-0"
            )}>
            {link.icon && <link.icon className={cn("size-4", className)} />}
            <span className="sr-only">{link.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
};
